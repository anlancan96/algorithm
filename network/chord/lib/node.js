var ChordUtils = require('./utils');

var Chord = {
    NOTIFY_JOIN: 'NOTIFY_JOIN',
    NOTIFY_PREDECESSOR: 'NOTIFY_PREDECESSOR',
    FIND_SUCCESSOR: 'FIND_SUCCESSOR',
    NOTIFY_SUCCESSOR: 'NOTIFY_SUCCESSOR',
    FOUND_SUCCESSOR: 'FOUND_SUCCESSOR',
    FIND_PREDECESSOR: 'FIND_PREDECESSOR',
    FOUND_PREDECESSOR: 'FOUND_PREDECESSOR',
}


function Node(ipaddress, port, id, sendChordMessage) {
    this.ipaddress = ipaddress;
    this.port = port;
    this.id = id;  // hash(ipaddress, port)
    this.predecessor = null;
    this.sendChordMessage = sendChordMessage;
    this._self = {
        ipaddress: this.ipaddress,
        port: this.port,
        id: this.id,
    }
   
    this.successor = this._self;
   
    // Each node can keep a finger table containing up to 'm' entries
    this.finger_table = [];
    this.finger_entries = 4;

    console.info('Node has route ' + this.ipaddress + ' : ' + this.port);
    console.info('Successor of node ' + this.id + ' is' + JSON.stringify(this.successor, undefined, 4));
    console.info('===================================================')
}

Node.prototype.closest_preceding_node = function(id) {
     /*
     * n.closest_preceding_node(id)
     *   for i = m downto 1
     *     if (finger[i]∈(n,id))
     *       return finger[i];
     *   return n;
     */

    for (var i = this.finger_table.length - 1; i >= 0; --i) {
        if (this.finger_table[i] && ChordUtils.in_range(this.finger_table[i].successor.id, this.id, id)) {
            return this.finger_table[i].successor;
        }
    }

    if (ChordUtils.in_range(this.successor.id, this.id, id)) {
        return this.successor;
    }

    return this._self;
}

Node.prototype.send = function(from, message, to) {
  
    if (typeof to === 'undefined') {
        to = from;
        from = this._self;
    }

    if (typeof message.id === 'undefined') {
        message.id = this.id;
    }

    var packet = {
        from: {
            ipaddress: from.ipaddress,
            port: from.port,
            id: from.id
        },
        message: message
    };
    
    return this.sendChordMessage(to, packet);
}

//called periodically.  tells the successor about of n 
Node.prototype.periodically = function() {
    let that = this;
    setInterval(function stabilise() {
        let successor = that.successor;
        let id = that.id;
        if(ChordUtils.DebugStabilise) {
            console.info('check successor');
            console.info('Node ' + id + 'has successor:' + JSON.stringify(successor, undefined, 4));
            console.info('==============================================');
        }

        let message = {
            type: Chord.FIND_PREDECESSOR
        }
        that.send(successor, message);
    }, 10000).unref();
    // setInterval(function fix_fingers() {

    // }, 20000).unref();
}

Node.prototype.notify = function() {
    let successor = this.successor;
    let id = this.id;
    let predecessor = this.predecessor;
    if(ChordUtils.DebugNodePredecessor) {
        console.info('check predecessor');
        console.info('Node ' + id + ' has predecessor: ' + JSON.stringify(predecessor, undefined, 4));
        console.info('Tells the successor ' + JSON.stringify(successor, undefined, 4));
        console.info('go to case NOTIFY_PREDECESSOR of node: ' + successor.id)
        console.info('===================================================')
    }
    let message = {
        type: Chord.NOTIFY_PREDECESSOR
    }
    this.send(successor, message);
}

var join_retry;

Node.prototype.join = function(remote) {
    //ask node n to find the successor of id
    this.predecessor = null;
    let that = this;
    function try_to_join() {
        if(ChordUtils.DebugNodeJoin) {
            console.info('NODE JOIN....');
            console.info('ASK NODE ' + JSON.stringify(remote, undefined, 4) + ' to find the successor of node' + that.id);
            console.info('go to case FIND_SUCCESSOR of node: ' + remote.id);
            console.info('===================================================');
        }
        that.send(remote, {type: Chord.FIND_SUCCESSOR, id: that.id});
    }
    //join_retry = setInterval(try_to_join, 10000).unref();
    try_to_join();
}



Node.prototype.receive = function(from, message) {
    switch (message.type) {
        case Chord.FIND_PREDECESSOR:
            message.type = Chord.FOUND_PREDECESSOR;
            message.predecessor = this.predecessor;
            this.send(from, message);
            break;
        case Chord.FOUND_PREDECESSOR:
            console.log('case FOUND_PREDECESSOR')
            console.log('current node ' + this.id)
            console.log('current successor ', this.successor.id);
            console.log('from node', from.id);
            console.info('===================================================')
            let x = message.predecessor;
         
            if(x !== null) {
                if(this.id === this.successor.id
                    || ChordUtils.in_range(x, this.id, this.successor.id)) {
                    this.successor = x;
                }
            }
            this.notify();
            break;
        case Chord.NOTIFY_PREDECESSOR:
            console.log('case NOTIFY_PREDECESSOR')
            console.log('current node ' + this.id)
            console.log('current predecessor ', JSON.stringify(this.predecessor, undefined, 4));
            console.log('from node', from.id);
           
            if (this.predecessor === null || ChordUtils.in_range(from.id, this.predecessor.id, this.id)) {
                console.info('node: ' + from.id + ' in range ' + (this.predecessor ? this.predecessor.id: null) + ' to ' + this.id);
                console.info('************************************************');
            } else {
                console.info('node: ' + from.id + ' dont in range ' + this.predecessor.id + ' to ' + this.id);
                console.info('===================================================');
            }
            if (this.predecessor === null || ChordUtils.in_range(from.id, this.predecessor.id, this.id)) {
                if (ChordUtils.DebugNodePredecessor) {
                    console.info('Node ' + this.id + ' has new predecessor: ' + JSON.stringify(from, undefined, 4));
                    console.info('===================================================');
                }
               
                this.predecessor = from;
            }
          
            break;
        case Chord.FOUND_SUCCESSOR:
            if (message.hasOwnProperty('next')) {
                this.finger_table[message.next] = from;
            }
            // Fall through
        case Chord.NOTIFY_SUCCESSOR:
            console.info('case NOTIFY_SUCCESSOR')
            console.info('from node: ', from.id);
            console.info('current node: ' + this.id);
            console.info('current successor of node: ' + this.id + ' is ' + this.successor.id)
            if (ChordUtils.in_range(from.id, this.id, this.successor.id)) { 
                console.info('************************************************');
            } else {
                console.info('===================================================');
            }
            
            if (ChordUtils.in_range(from.id, this.id, this.successor.id)) {
                if (ChordUtils.DebugNodePredecessor) {
                    console.log('Node: ' + this.id + ' has new successor: ' + JSON.stringify(from, undefined, 4));
                    console.info('===================================================')
                }
                this.successor = from;
            }
            break;
        case Chord.FIND_SUCCESSOR:
            console.info('case FIND_SUCCESSOR')
            if (ChordUtils.in_half_open_range(message.id, this.id, this.successor.id)) {
                message.type = Chord.FOUND_SUCCESSOR;
                if (ChordUtils.DebugSuccessor)
                    console.info('NOTIFY: node ' + this.successor.id + ' is successor of node: ' + message.id);
                    console.info('go to case FOUND_SUCCESSOR of node: ' + from.id)
                    console.info('===================================================')

                this.send(this.successor, message, from);
            } else {
                let n0 = this.closest_preceding_node(message.id);
                console.info('closest_preceding_node: ', JSON.stringify(n0, undefined, 4));
                console.info('===================================================')
                this.send(n0, message, from);
            }
            break;
        default:
            // ignore any messages that we don't recognize
            console.error('Unknown Chord message type ' + message.type);
            console.info('===================================================')
            break;
    }
}

module.exports = Node;


