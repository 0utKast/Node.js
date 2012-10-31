var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
  var lookup = url.parse(decodeURI(request.url)).pathname;
  lookup = path.normalize(lookup);
  lookup = (lookup === "/") ? '/index.html' : lookup;
  var f = 'content' + lookup;
  fs.readFile(f, function (err, data) {
    response.end(data);
  });

}).listen(8080);

