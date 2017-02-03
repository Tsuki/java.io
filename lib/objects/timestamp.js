'use strict';

var debug = require('debug')('java.io:objects:timestamp');
var cons = require('../constants');
var assert = require('assert');

exports.readObject = function(io, obj) {
  debug('>> date readObject');
  io.readBlockHeader();

  var fastTime = io.readLong().toNumber();
  // io.defaultReadObject(obj);
  debug('<< readObject | fastTime = %s', fastTime);
  // var map = {};
  // map['Date'] = new Date(fastTime);;
  // assert.equal(io.readByte(), cons.TC_ENDBLOCKDATA,
  //   'SC_WRITE_METHOD object should end with TC_ENDBLOCKDATA');
  io.defaultReadObject(obj);
  obj._$ = new Date(fastTime);

  // io._readNewObject();
  // io.readByte();
  // io._readObject();
  return fastTime;
};

exports.writeObject = function(io, obj) {
  io.defaultWriteObject(obj);
  io.writeBlockHeader(8);

  io.writeLong(obj._$.getTime());
};
