 var net = require('net');
 var cliente = new net.Socket(); 
cliente.setEncoding('utf8'); 
 
// conectar al servidor 
cliente.connect ('8124','localhost', function () { 
    console.log('conectado al servidor'); 
    cliente.write('Ya podemos comunicarnos sin un Navegador'); 
}); 
 
// preparado para entradas desde la terminal 
process.stdin.resume(); 
 
// cuando recibe datos, los envía al servidor 
process.stdin.on('data', function (data) { 
   cliente.write(data); 
}); 
 
// cuando recibe datos de vuelta, los imprime en la consola 
cliente.on('data',function(data) { 
    console.log(data); 
}); 
 
// cuando el servidor se cierra 
cliente.on('close',function() { 
    console.log('la conexión se ha cerrado'); 
});