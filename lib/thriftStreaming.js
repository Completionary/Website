var thriftWrapper = require('co-thrift'),
    thrift = require('thrift'),
    StreamingService = require('../thrift/StreamingService'),
    StramingClientService = require('../thrift/StreamingClientService');
var transport = thrift.TFramedTransport;
var protocol = thrift.TBinaryProtocol;

// CLIENT
var connection = thrift.createConnection('metalcon2.physik.uni-mainz.de', 5002, {
    transport: transport,
    protocol: protocol
});

connection.on('error', function (err) {
    console.log(err);
});

var client = thrift.createClient(thriftWrapper(StreamingService.Client), connection);

module.exports.connectForEndpoint = function *connectForEndpoint (name) {
    yield client.establishStream(name, '141.26.95.167', 9090);
}


// SERVER
var server = thrift.createServer(StreamingClientServiceClient, {
    updateStatistics: function (data) {
        console.log(data);
    }
});

server.listen(9090);
