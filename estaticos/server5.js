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
  fs.stat(f, function (err, stats) {
    var ultimoCambio = Date.parse(stats.ctime),
      estaActualizado = (cache[f]) && ultimoCambio  > cache[f].timestamp;
    if (!cache[f] || estaActualizado) {
      fs.readFile(f, function (err, data) {
        console.log('cargando ' + f + ' desde archivo');
        if (!err) {
          cache[f] = {content: data,
                      timestamp: Date.now() //almacenar datos tiempo actual
                     };
        }
        cb(err, data);
      });
      return;
    }
    console.log('cargando ' + f + ' de cache');
    cb(null, cache[f].content);
  }); //final de fs.stat
}

http.createServer(function (request, response) {
  var buscar= path.basename(decodeURI(request.url)) || 'index.html',
    f = 'content/' + buscar;
  fs.exists(f, function (exists) { //path.exists para Node 0.6 e inferiores
    if (exists) {

      cacheYEntrega(f, function (err, data) {
        if (err) {response.writeHead(500); response.end(); return; }
        var headers = {'Content-type': mimeTypes[path.extname(f)]};
        response.writeHead(200, headers);
        response.end(data);

      });
      return;

    }
    response.writeHead(404); //no se ha encontrado archivo
    response.end('Pagina no encontrada');

  });

}).listen(process.env.PORT || 8080);
