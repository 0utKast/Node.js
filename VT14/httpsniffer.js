
var util = require('util');
var url  = require('url');

exports.sniffOn = function(server) {
    // Emitido cada vez que hay una request.
    // request es una instancia de http.ServerRequest 
    // response es una instancia de http.ServerResponse
    server.on('request', function(req, res) {
        util.log('request');
        util.log(reqToString(req));
    });

    // Llamado cuando un nuevo stream TCP es establecido. 
    // stream es un objeto de tipo net.Stream. 
    // En general los usuarios no quieren acceder a este evento. 
    // El stream puede también ser accedido en request.connection.
    // var e_connection = function(stream) {
    // };
    
    // Emitido cuando el servidor se cierras.
    server.on('close', function(errno) {
        util.log('close errno='+ errno);
    });

    // Emitido cada vez que una request con un http Expect: 100-continue es recibida. 
    // Si el evento no lo está escuchando, 
    // el servidor automáticamente responderá con un 100 Continue como apropiado.
    // Manejar este evento incluye llamar a response.writeContinue 
    // si el cliente debe continuar enviando el cuerpo request, 
    // o generando una respuesta HTTP apropiada (p.e., 400 Bad Request) 
    // si el cliente no debe continuar enviando el cuerpo request.
    server.on('checkContinue', function(req, res) {
        util.log('checkContinue');
        util.log(reqToString(req));
        res.writeContinue();
    });

    // Emitido cada vez que el cliente requests una actualización http. 
    // Si el cliente no lo está oyendo, 
    // entonces los clientes que han solicitado la actualización tendrás sus conexiones cerradas.
    server.on('upgrade', function(req, socket, head) {
        util.log('upgrade');
        util.log(reqToString(req));
    });

    // Si una conexión cliente emite un evento 'error' event - será transmitido aquíº   .
    server.on('clientError', function() {
        util.log('clientError');
    });

    // server.on('connection',    e_connection);
}

var reqToString = function(req) {
    var ret = 'request ' + req.method +' '+ req.httpVersion +' '+ req.url +'\n';
    ret += JSON.stringify(url.parse(req.url, true)) +'\n';
    var keys = Object.keys(req.headers);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        ret += i +' '+ key +': '+ req.headers[key] +'\n';
    }
    if (req.trailers)
        ret += req.trailers +'\n';
    return ret;
}
exports.reqToString = reqToString;

