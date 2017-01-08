var moment = require('moment');

var JSDate = 1483085059498;

var myUnixDate = moment(JSDate).fromNow();

console.log('this is a UNIX date: ' + myUnixDate);