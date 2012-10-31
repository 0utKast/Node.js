var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};


var cache = {
  store: {},
  maxSize: 26214400, //(bytes) 25mb
  maxAge: 5400 * 1000, //(ms) 1 hora y media
  cleanAfter: 7200 * 1000,//(ms) dos horas 
  cleanedAt: 0, //para ser configurado dinamicamente
  clean: function (now) {
    if (now - this.cleanAfter > this.cleanedAt) {
      console.log('Se lleva a cabo la limpieza...');
      this.cleanedAt = now;
      var that = this;
      Object.keys(this.store).forEach(function (file) {
        if (now > that.store[file].timestamp + that.maxAge) {
          delete that.store[file];
        }
      });
    }
  }
};


http.createServer(function (request, response) {
  var buscar = path.basename(decodeURI(request.url)) || 'index.html',
    f = 'content/' + buscar;
  fs.exists(f, function (exists) { //path.exists para Node 0.6 e inferiores
    if (exists) {
      var headers = {'Content-type': mimeTypes[path.extname(f)]};
      if (cache.store[f]) {
        console.log('desde cache');
        response.writeHead(200, headers);
        response.end(cache.store[f].content);
        return;
      }

      var s = fs.createReadStream(f).once('open', function () {
        console.log('desde stream');
        response.writeHead(200, headers);
        this.pipe(response);
      }).once('error', function (e) {
        console.log(e);
        response.writeHead(500);
        response.end('Error del servidor');
      });

      fs.stat(f, function (err, stats) {
        if (stats.size < cache.maxSize) {
          var bufferOffset = 0;
          cache.store[f] = {content: new Buffer(stats.size),
                            timestamp: Date.now()};
          s.on('data', function (data) {
            data.copy(cache.store[f].content, bufferOffset);
            bufferOffset += data.length;
          });
        }
      });


      return;

    }
    response.writeHead(404); //no se ha encontrado el archivo
    response.end('Pagina no encontrada');

  });
  //Después de todo nuestro código
  cache.clean(Date.now());

}).listen(process.env.PORT || 8080);
