var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : ''
});

connection.connect();

connection.query('CREATE DATABASE node', function(err) {
  if (err) {
    connection.end();
    throw err;
  }
});

connection.end();




