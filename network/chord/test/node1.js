var Server = require('../lib');

Server('localhost', 6970, '3', {
    join: {
        ipaddress: 'localhost',
        port: 6969,
        id: '0'
    }
});