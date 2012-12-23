var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : ''
});

connection.connect();

connection.query('USE node');
 


query = connection.query(
  'SELECT id, content FROM test WHERE id IN (?, ?)',
  [1, 2],  function(err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results);
  }
);

 
connection.end();




