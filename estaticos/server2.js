var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};

http.createServer(function (request, response) {
  var buscar = path.basename(decodeURI(request.url)) || 'index.html',
    f = 'content/' + buscar;
  fs.exists(f, function (exists) { //path.exists para Node 0.6 e inferior
    if (exists) {
      fs.readFile(f, function (err, data) {
        if (err) {response.writeHead(500); response.end('Error del Servidor'); return; }
        var headers = {'Content-type': mimeTypes[path.extname(buscar)]};
        response.writeHead(200, headers);
        response.end(data);
      });
      return;
    }
    response.writeHead(404); //No se ha encontrado ese archivo
    response.end('Pagina no encontrada');
  });

}).listen(process.env.PORT || 8080);
