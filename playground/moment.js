var moment = require("moment");

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var currentTime = moment().format('LT'); 

console.log(moment().format('LT'));