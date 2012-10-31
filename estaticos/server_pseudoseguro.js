/*¡¡¡ADVERTENCIA: NO PARA USO PRODUCTIVO!!!!*/
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
  var lookup = url.parse(decodeURI(request.url)).pathname;
  lookup = (lookup === "/") ? '/index.html-serve' : lookup + '-serve';
  var f = 'content-pseudoseguro' + lookup;
  console.log(f);
  fs.exists(f, function (exists) { //path.exists for Node 0.6 and below
    if (!exists) {
      response.writeHead(404);
      response.end('Pagina no encontrada');
      return;
    }
    fs.readFile(f, function (err, data) {
      response.end(data);
    });

  });


}).listen(8080);

