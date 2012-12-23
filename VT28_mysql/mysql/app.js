var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : ''
});

connection.connect();

connection.query('SELECT "Hola, Mundo"',
  function (err, results, fields) {
    console.log(results);
    console.log(fields);    
  }
);

connection.end();

