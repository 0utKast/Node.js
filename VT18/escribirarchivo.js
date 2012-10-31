
var fs = require('fs'),
    datos = "Ejemplo de datos que podemos escribir en un archivo";
fs.writeFile('archivo.txt', datos, function (err) {
  if (!err) {
    console.log('Los datos han sido escrito a archivo.txt');
  } else {
    throw err;
  }
});