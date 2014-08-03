//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var exceptions_ttypes = require('./exceptions_types')


var ttypes = module.exports = {};
StreamedStatisticsField = module.exports.StreamedStatisticsField = function(args) {
  this.numberOfCurrentUsers = null;
  this.numberOfQueries = null;
  this.randomSampleOfCurrentCompletedTerms = null;
  this.numberOfSelectedSuggestions = null;
  this.conversionRate = null;
  this.numberOfShownSuggestions = null;
  if (args) {
    if (args.numberOfCurrentUsers !== undefined) {
      this.numberOfCurrentUsers = args.numberOfCurrentUsers;
    }
    if (args.numberOfQueries !== undefined) {
      this.numberOfQueries = args.numberOfQueries;
    }
    if (args.randomSampleOfCurrentCompletedTerms !== undefined) {
      this.randomSampleOfCurrentCompletedTerms = args.randomSampleOfCurrentCompletedTerms;
    }
    if (args.numberOfSelectedSuggestions !== undefined) {
      this.numberOfSelectedSuggestions = args.numberOfSelectedSuggestions;
    }
    if (args.conversionRate !== undefined) {
      this.conversionRate = args.conversionRate;
    }
    if (args.numberOfShownSuggestions !== undefined) {
      this.numberOfShownSuggestions = args.numberOfShownSuggestions;
    }
  }
};
StreamedStatisticsField.prototype = {};
StreamedStatisticsField.prototype.read = function(input) {
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
        this.numberOfCurrentUsers = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.numberOfQueries = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.randomSampleOfCurrentCompletedTerms = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readString();
          this.randomSampleOfCurrentCompletedTerms.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.numberOfSelectedSuggestions = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.DOUBLE) {
        this.conversionRate = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.I32) {
        this.numberOfShownSuggestions = input.readI32();
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

StreamedStatisticsField.prototype.write = function(output) {
  output.writeStructBegin('StreamedStatisticsField');
  if (this.numberOfCurrentUsers !== null && this.numberOfCurrentUsers !== undefined) {
    output.writeFieldBegin('numberOfCurrentUsers', Thrift.Type.I32, 1);
    output.writeI32(this.numberOfCurrentUsers);
    output.writeFieldEnd();
  }
  if (this.numberOfQueries !== null && this.numberOfQueries !== undefined) {
    output.writeFieldBegin('numberOfQueries', Thrift.Type.I32, 2);
    output.writeI32(this.numberOfQueries);
    output.writeFieldEnd();
  }
  if (this.randomSampleOfCurrentCompletedTerms !== null && this.randomSampleOfCurrentCompletedTerms !== undefined) {
    output.writeFieldBegin('randomSampleOfCurrentCompletedTerms', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRING, this.randomSampleOfCurrentCompletedTerms.length);
    for (var iter7 in this.randomSampleOfCurrentCompletedTerms)
    {
      if (this.randomSampleOfCurrentCompletedTerms.hasOwnProperty(iter7))
      {
        iter7 = this.randomSampleOfCurrentCompletedTerms[iter7];
        output.writeString(iter7);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.numberOfSelectedSuggestions !== null && this.numberOfSelectedSuggestions !== undefined) {
    output.writeFieldBegin('numberOfSelectedSuggestions', Thrift.Type.I32, 4);
    output.writeI32(this.numberOfSelectedSuggestions);
    output.writeFieldEnd();
  }
  if (this.conversionRate !== null && this.conversionRate !== undefined) {
    output.writeFieldBegin('conversionRate', Thrift.Type.DOUBLE, 5);
    output.writeDouble(this.conversionRate);
    output.writeFieldEnd();
  }
  if (this.numberOfShownSuggestions !== null && this.numberOfShownSuggestions !== undefined) {
    output.writeFieldBegin('numberOfShownSuggestions', Thrift.Type.I32, 6);
    output.writeI32(this.numberOfShownSuggestions);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

