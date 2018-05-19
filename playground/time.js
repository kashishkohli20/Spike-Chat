const moment = require('moment');

let date = new moment();
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

let createdAt = new Date().getTime();
let newDate = moment(createdAt).format('H:mm A');
console.log(newDate);
console.log(/*let someTimestamp = */moment().valueOf());
