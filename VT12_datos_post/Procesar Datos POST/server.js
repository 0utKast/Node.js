var http = require('http');
var form = require('fs').readFileSync('form.html');
http.createServer(function (request, response) {
if (request.method === "POST") {
var postData = '';
request.on('data', function (chunk) {
postData += chunk;
}).on('end', function() {
console.log('Usuario escribió:\n' + postData);
response.end('Usted ha escrito:\n' + postData);
});
}
if (request.method === "GET") {
response.writeHead(200, {'Content-Type': 'text/html'});
response.end(form);
}
}).listen(process.env.PORT || 8080);

