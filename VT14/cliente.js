var http = require('http');

var options = {
  host: 'illasaron.com',
  port: 80,
  path: '/'
};

http.get(options, function(res) {
  if (res.statusCode  == 200) {
    console.log("El sitio funciona correctamente");
  }
  else {
    console.log("El sitio parece estar caído");
  }
}).on('error', function(e) {
  console.log("ha habido un error: " + e.message);
});