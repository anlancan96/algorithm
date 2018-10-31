var Server = require('../lib');

Server('localhost', 6971, '2', {
    join: {
        ipaddress: 'localhost',
        port: 6970,
        id: '3'
    }
});