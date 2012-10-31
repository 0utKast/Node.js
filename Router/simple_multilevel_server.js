var http = require('http');

var pages = [
  {route: '/', output: 'Woohoo!'},
  {route: '/about/this', output: 'Multilevel routing with Node example'},
  {route: '/about/node', output: 'Evented I/O for V8 JavaScript.'},
  {route: '/another page', output: function () {return 'Here\'s ' + this.route; }}
];

http.createServer(function (request, response) {
  var lookup = decodeURI(request.url);
  pages.forEach(function (page) {
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
}).listen(1123);
