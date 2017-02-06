const io = require('../lib');
const ObjectInputStream = io.InputObjectStream
const fs = require('fs');

const ret = ObjectInputStream.read(fs.readFileSync('raw2.bin'));
console.log(ret);