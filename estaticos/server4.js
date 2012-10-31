var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};

var cache = {};
function cacheYEntrega(f, cb) {
  if (!cache[f]) {
    fs.readFile(f, function (err, data) {
      if (!err) {
        cache[f] = {content: data};
      }     
      cb(err, data);
    });
    return;
  }
  console.log('cargando ' + f + ' de cache');
  cb(null, cache[f].content);
}

http.createServer(function (request, response) {
  var buscar = path.basename(decodeURI(request.url)) || 'index.html',
    f='content/' + buscar;
  fs.exists(f, function (exists) { //path.exists para Node 0.6 e inferiores
    if (exists) {

      cacheYEntrega(f, function (err, data) {
        if (err) {response.writeHead(500); response.end('Error del servidor'); return; }
        var headers={'Content-type':mimeTypes[path.extname(f)]};
        response.writeHead(200, headers);
        response.end(data); 
         
      });
      return;
        
    } 
      response.writeHead(404); //No se ha encontrado tal fichero
      response.end('Página no encontrada');
    
  });

}).listen(process.env.PORT || 8080);