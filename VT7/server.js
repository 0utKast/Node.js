var http = require('http');
var path = require('path');

var paginas = [
{route: '/', output: 'Funcionando'},
{route: 'about', childRoutes: [
{route: 'node', output: 'Evented I/O for V8 Javascript'},
{route: 'primera', output: 'Complex Multilevel Example'}
]},
{route: '/otra pagina', output: function () {return 'Estamos en ' + this.route; }}
];
http.createServer(function (request, response) {
var buscar = decodeURI(request.url);
paginas.forEach(function(pagina) {
if (pagina.route === buscar) {
response.writeHead(200, {'Content-Type': 'text/html'});
response.end(typeof pagina.output === 'function'
? pagina.output() : pagina.output);
}
});
if (!response.finished) {
response.writeHead(404);
response.end('Pagina no encontrada');
}
}).listen(process.env.PORT || 8080);