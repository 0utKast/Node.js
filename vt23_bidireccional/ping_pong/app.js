var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  fs.readFile('./index.html', function(error, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data, 'utf-8');
  });
}).listen(3000, "127.0.0.1");
console.log('Servidor ejecutándose en http://127.0.0.1:3000/');

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('ping', function (data) {
    console.log('Recibido PING. Enviando PONG..');
    socket.emit('pong', { text: 'PONG' });
  });
  socket.on('pong', function (data) {
    console.log('Recibido PONG response. PONG');
  });
  setInterval(function() {
    console.log('Enviando PING a cliente..');
    socket.emit('ping', { text: 'PING' });
  }, 10000);
});