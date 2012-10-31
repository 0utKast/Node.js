var http = require('http');
http.createServer(function (request, response) {
response.writeHead(200, {'Content-Type': 'text/html'});
response.end('Woohoo!');
}).listen(8080);
console.log('Servidor ejecutándose en 8080/');