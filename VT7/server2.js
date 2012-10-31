var http = require('http');
var path = require('path');

var pages = [
{route: '', output: 'Woohoo!'},
{route: 'about', output: 'A simple routing with Node example'},
{route: 'another page', output: function() {return 'Here\'s '+this.route;}},
];
http.createServer(function (request, response) {
var lookup = path.basename(decodeURI(request.url));
pages.forEach(function(page) {
if (page.route === lookup) {
response.writeHead(200, {'Content-Type': 'text/html'});
response.end(typeof page.output === 'function'
? page.output() : page.output);
}
});
if (!response.finished) {
response.writeHead(404);
response.end('Page Not Found!');
}
}).listen(process.env.PORT || 8080);