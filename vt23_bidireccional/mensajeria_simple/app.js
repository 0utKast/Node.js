var http = require('http');
var fs = require('fs');

var servidor = http.createServer(function (req, res) {
 fs.readFile('./index.html', function(error, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data, 'utf-8');
  });
}).listen(3000, "127.0.0.1");
console.log('Servidor ejecutándose en http://127.0.0.1:3000/');

var io = require('socket.io').listen(servidor);

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.broadcast.emit('enviar mensaje', data);
  });
});