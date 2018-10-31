var Node = require('./node');

var WebSocket = require('ws');

var serialize = (data) => {
    try {
        return JSON.stringify(data);
    } catch (error) {
        console.error(error);
    }
}

var deserialize = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
}

function Server(ipaddress, port, id, options) {
    this.node = null;
    this.nodes = {};
    this.last_node = id;
    let that = this;

    var wss = new WebSocket.Server({
        port: port,
        host: ipaddress
    });
    
    wss.on('connection', (ws) => {
        // Start the protocol layer.
        ws.on('message', (payload) => {
            
            var packet = deserialize(payload);
            // Get last node's instance by ID
            var to = that.nodes[that.last_node];
            // Forward the message
            if (packet.to) {
                // Forward this message to the node ID
                to = that.nodes[packet.to];
            }
    
            // Get node instance by ID
            if (to) {
                to.receive(packet.from, packet.message);
            }
        })

        ws.on('close', () => {

        });

        ws.on('error', () => {

        });
    });

    var node = new Node(ipaddress, port, id, sendChordMessage);
    this.node = this.nodes[id] = node;

    var options = options || {};
    if (typeof options.join === 'object') {
        this.node.join(options.join);
    }
    this.node.periodically();
}


var connections = [];

var sendChordMessage = function(to, packet) {
    
    var url = 'ws://' + to.ipaddress + ':' + to.port;
    var host = 'ws://' + to.ipaddress + ':' + to.port; 

    var payload = {
        message: packet.message,
        from: packet.from,
    }

    var connection = connections[host] || null;

    if(connection) {
        if(connection.isAlive) {
            connection.send(serialize(payload));
        } else {
            delete connections[host];
        }
        return 0; 
    }

    
    var ws = new WebSocket(url);
    ws.on('open', () => {
        ws.send(serialize(payload));
        ws.isAlive = true;
        connections[host] = ws;

        ws.on('close', () => {
            delete connections[host];
        });

        ws.on('error', () => {
            delete connections[host];
        });
    });
}

module.exports = Server;