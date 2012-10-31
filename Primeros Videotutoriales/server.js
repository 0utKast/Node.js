 // cargar módulo http 
var http = require('http'); 
 
// crear servidor server 
http.createServer(function (req, res) {  
 
  // contenido header 
  res.writeHead(200, {'content-type': 'text/plain'}); 
 
  // escribir mensaje e indicar comunicación está completa 
  res.end("Hola, Mundo\n"); 
}).listen(8124); 
 
 


