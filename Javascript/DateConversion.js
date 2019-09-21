var data = "2019-09-21T05:03:30.880932"
var date = new Date(data);
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

console.log(data)
console.log(date.toLocaleDateString('es-US', options))
console.log(date.toUTCString())