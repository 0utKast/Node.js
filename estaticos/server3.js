var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function (request, response) {
var buscar = path.basename(decodeURI(request.url)) || 'index.html',
f = 'content/' + buscar;
fs.exists(f, function (exists) {
console.log(exists ? buscar + " existe" : buscar+ " no existe");
});
}).listen(process.env.PORT || 8080);
