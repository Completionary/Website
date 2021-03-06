//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var admin_ttypes = require('./admin_types')


var ttypes = require('./analytics_types');
//HELPER FUNCTIONS AND STRUCTURES

AnalyticsService_topQueriesSince_args = function(args) {
  this.date = null;
  this.k = null;
  if (args) {
    if (args.date !== undefined) {
      this.date = args.date;
    }
    if (args.k !== undefined) {
      this.k = args.k;
    }
  }
};
AnalyticsService_topQueriesSince_args.prototype = {};
AnalyticsService_topQueriesSince_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.date = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I16) {
        this.k = input.readI16();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AnalyticsService_topQueriesSince_args.prototype.write = function(output) {
  output.writeStructBegin('AnalyticsService_topQueriesSince_args');
  if (this.date !== null && this.date !== undefined) {
    output.writeFieldBegin('date', Thrift.Type.I32, 1);
    output.writeI32(this.date);
    output.writeFieldEnd();
  }
  if (this.k !== null && this.k !== undefined) {
    output.writeFieldBegin('k', Thrift.Type.I16, 2);
    output.writeI16(this.k);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AnalyticsService_topQueriesSince_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
AnalyticsService_topQueriesSince_result.prototype = {};
AnalyticsService_topQueriesSince_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.success = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new admin_ttypes.SuggestionField();
          elem6.read(input);
          this.success.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AnalyticsService_topQueriesSince_result.prototype.write = function(output) {
  output.writeStructBegin('AnalyticsService_topQueriesSince_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter7 in this.success)
    {
      if (this.success.hasOwnProperty(iter7))
      {
        iter7 = this.success[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AnalyticsService_getNumberOfTotalQueriesThisMonth_args = function(args) {
  this.index = null;
  if (args) {
    if (args.index !== undefined) {
      this.index = args.index;
    }
  }
};
AnalyticsService_getNumberOfTotalQueriesThisMonth_args.prototype = {};
AnalyticsService_getNumberOfTotalQueriesThisMonth_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.index = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AnalyticsService_getNumberOfTotalQueriesThisMonth_args.prototype.write = function(output) {
  output.writeStructBegin('AnalyticsService_getNumberOfTotalQueriesThisMonth_args');
  if (this.index !== null && this.index !== undefined) {
    output.writeFieldBegin('index', Thrift.Type.STRING, 1);
    output.writeString(this.index);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AnalyticsService_getNumberOfTotalQueriesThisMonth_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
AnalyticsService_getNumberOfTotalQueriesThisMonth_result.prototype = {};
AnalyticsService_getNumberOfTotalQueriesThisMonth_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.I64) {
        this.success = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AnalyticsService_getNumberOfTotalQueriesThisMonth_result.prototype.write = function(output) {
  output.writeStructBegin('AnalyticsService_getNumberOfTotalQueriesThisMonth_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I64, 0);
    output.writeI64(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AnalyticsService_getIndexSize_args = function(args) {
  this.index = null;
  if (args) {
    if (args.index !== undefined) {
      this.index = args.index;
    }
  }
};
AnalyticsService_getIndexSize_args.prototype = {};
AnalyticsService_getIndexSize_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.index = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AnalyticsService_getIndexSize_args.prototype.write = function(output) {
  output.writeStructBegin('AnalyticsService_getIndexSize_args');
  if (this.index !== null && this.index !== undefined) {
    output.writeFieldBegin('index', Thrift.Type.STRING, 1);
    output.writeString(this.index);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AnalyticsService_getIndexSize_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
AnalyticsService_getIndexSize_result.prototype = {};
AnalyticsService_getIndexSize_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.I32) {
        this.success = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AnalyticsService_getIndexSize_result.prototype.write = function(output) {
  output.writeStructBegin('AnalyticsService_getIndexSize_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I32, 0);
    output.writeI32(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AnalyticsServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
AnalyticsServiceClient.prototype = {};
AnalyticsServiceClient.prototype.topQueriesSince = function(date, k, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_topQueriesSince(date, k);
};

AnalyticsServiceClient.prototype.send_topQueriesSince = function(date, k) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('topQueriesSince', Thrift.MessageType.CALL, this.seqid);
  var args = new AnalyticsService_topQueriesSince_args();
  args.date = date;
  args.k = k;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AnalyticsServiceClient.prototype.recv_topQueriesSince = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AnalyticsService_topQueriesSince_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('topQueriesSince failed: unknown result');
};
AnalyticsServiceClient.prototype.getNumberOfTotalQueriesThisMonth = function(index, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getNumberOfTotalQueriesThisMonth(index);
};

AnalyticsServiceClient.prototype.send_getNumberOfTotalQueriesThisMonth = function(index) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getNumberOfTotalQueriesThisMonth', Thrift.MessageType.CALL, this.seqid);
  var args = new AnalyticsService_getNumberOfTotalQueriesThisMonth_args();
  args.index = index;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AnalyticsServiceClient.prototype.recv_getNumberOfTotalQueriesThisMonth = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AnalyticsService_getNumberOfTotalQueriesThisMonth_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getNumberOfTotalQueriesThisMonth failed: unknown result');
};
AnalyticsServiceClient.prototype.getIndexSize = function(index, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_getIndexSize(index);
};

AnalyticsServiceClient.prototype.send_getIndexSize = function(index) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getIndexSize', Thrift.MessageType.CALL, this.seqid);
  var args = new AnalyticsService_getIndexSize_args();
  args.index = index;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AnalyticsServiceClient.prototype.recv_getIndexSize = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AnalyticsService_getIndexSize_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getIndexSize failed: unknown result');
};
AnalyticsServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
AnalyticsServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

AnalyticsServiceProcessor.prototype.process_topQueriesSince = function(seqid, input, output) {
  var args = new AnalyticsService_topQueriesSince_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.topQueriesSince(args.date, args.k, function (err, result) {
    var result = new AnalyticsService_topQueriesSince_result((err != null ? err : {success: result}));
    output.writeMessageBegin("topQueriesSince", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

AnalyticsServiceProcessor.prototype.process_getNumberOfTotalQueriesThisMonth = function(seqid, input, output) {
  var args = new AnalyticsService_getNumberOfTotalQueriesThisMonth_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.getNumberOfTotalQueriesThisMonth(args.index, function (err, result) {
    var result = new AnalyticsService_getNumberOfTotalQueriesThisMonth_result((err != null ? err : {success: result}));
    output.writeMessageBegin("getNumberOfTotalQueriesThisMonth", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

AnalyticsServiceProcessor.prototype.process_getIndexSize = function(seqid, input, output) {
  var args = new AnalyticsService_getIndexSize_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.getIndexSize(args.index, function (err, result) {
    var result = new AnalyticsService_getIndexSize_result((err != null ? err : {success: result}));
    output.writeMessageBegin("getIndexSize", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

