'use strict';

var debug = require('debug')('java.io:objects:timestamp');
var cons = require('../constants');
var assert = require('assert');

exports.readObject = function(io, obj) {
  debug('>> date readObject');
  io.readBlockHeader();

  var fastTime = io.readLong().toNumber();
  debug('<< readObject | fastTime = %s', fastTime);
  io.defaultReadObject(obj);
  obj._$ = new Date(fastTime);
  io.in.putInt8(120);
  io.in._offset--;
  return fastTime;
};

exports.writeObject = function(io, obj) {
  io.defaultWriteObject(obj);
  io.writeBlockHeader(8);

  io.writeLong(obj._$.getTime());
};
