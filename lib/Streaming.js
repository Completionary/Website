var thriftWrapper = require('co-thrift'),
    thrift = require('thrift'),
    _ = require('underscore'),
    sockjs = require('sockjs'),
    co = require('co'),
    StreamingService = require('../thrift/StreamingService'),
    StreamingClientService = require('../thrift/StreamingClientService'),
    config = require('../config');
var transport = thrift.TFramedTransport;
var protocol = thrift.TBinaryProtocol;

// CLIENT
var connection = thrift.createConnection(config.thriftStreamingServer.host, config.thriftStreamingServer.port, {
    transport: transport,
    protocol: protocol
});

connection.on('error', function (err) {
    console.log(err);
});

var client = thrift.createClient(thriftWrapper(StreamingService.Client), connection);

var establishStream = function *establishStream (name) {
    yield client.establishStream(name, config.host, config.thriftStreamingPort);
};

var closeStream = function *close(name) {
    yield client.establishStream(name, config.host, config.thriftStreamingPort);
};

// SERVER
var i = 0;
var server = thrift.createServer(StreamingClientService.Processor, {
    updateStatistics: function (data, cb) {
        cb();
        distributeData(_.pairs(data), 1000);
    }
}, {
    transport: transport,
    protocol: protocol
});

server.listen(config.thriftStreamingPort);

// Distribute data to websocket
function distributeData(data, maxNum) {
  if (data.length > maxNum) {
    var half_length = Math.ceil(data.length / 2);
    var leftSide = data.splice(0,half_length);
    setImmediate(distributeData, leftSide, maxNum);
    setImmediate(distributeData, data, maxNum);
  } else {
    _.each(data, function (ele) {
      var endpoint = ele[0];
      var d = ele[1];
      if (allConnections[endpoint]) {
        _.each(allConnections[endpoint], function (conn) {
          conn.write(JSON.stringify(d));
        });
      }
    });
  }
}

// Websoket Server
var allConnections = {};
var realtimeServer = sockjs.createServer();
realtimeServer.on('connection', function (conn) {
    conn.on('data', function (message) {
      try {
        co(function *() {
          yield establishStream(message);
          if (!allConnections[message]) {
            allConnections[message] = [conn];
          } else {
            allConnections[message].push(conn);
          }
        })();
      } catch(e) {
        console.log(e);
      }
    });
    conn.on('close', function () {
      console.log('close');
    });
});
module.exports.initSockjs = function (s) {
  realtimeServer.installHandlers(s, {prefix: '/websocket'});
};
