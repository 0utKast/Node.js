var http = require('http');
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');
var maxData = 12 * 1024 * 1024; //12mb
http.createServer(function (request, response) {
  if (request.method === "POST") {
    var postData = '';
    request.on('data', function (chunk) {
      postData += chunk;
     if (postData.length > maxData) {
postData = '';
this.pause();
response.writeHead(413); // Entidad Request demasiado larga
response.end('Demasiado larga');
} 

    }).on('end', function () {
      if (!postData) { response.end(); return; } //Evita que peticiones post vacías puedan tirar el servidor.
      var postDataObject = querystring.parse(postData);
      console.log('El Usuario ha escrito:\n', postData);
      response.end('Has escrito:\n' + util.inspect(postDataObject));
    });
    return;
  }
  if (request.method === "GET") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
}).listen(8080);
