var http = require('http');


var paginas = [
{route: '/', output: 'Funcionando'},
{route: '/about/primera', output: 'Enrutamiento Multinivel con Node'},
{route: '/about/node', output: 'Tratamiento de Eventos I/O para JavaScript V8.'},
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