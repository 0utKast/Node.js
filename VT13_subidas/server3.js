var http = require('http');
var fs = require('fs');
var form = fs.readFileSync('put_upload_form.html');
http.createServer(function (request, response) {
  if (request.method === "PUT") {
    var fileData = new Buffer(+request.headers['content-length']),
      bufferOffset = 0;
    request.on('data', function (chunk) {
      chunk.copy(fileData, bufferOffset);
      bufferOffset += chunk.length;
    }).on('end', function () {
      var rand = (Math.random() * Math.random())
                 .toString(16).replace('.', ''),
        to = 'uploads/' + rand + "-" +
                request.headers['x-uploadedfilename'];
      fs.writeFile(to, fileData, function (err) {
        if (err) { throw err; }
     	  console.log('Saved file to ' + to);
        response.end();
      });
    });
  }
  if (request.method === "GET") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
}).listen(8080);
