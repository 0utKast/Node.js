var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : ''
});

connection.connect();

connection.query('USE node');
 
connection.query('CREATE TABLE test ' +
             '(id INT(11) AUTO_INCREMENT, ' +
             ' content VARCHAR(255), ' +
             ' PRIMARY KEY(id))'
);
 
connection.query('INSERT INTO test (content) VALUES ("Hola")');
connection.query('INSERT INTO test (content) VALUES ("Mundo")');
 
connection.end();




