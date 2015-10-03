var mysql = require("mysql");

var connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"jianhua334455",
  database:"mydb"
});

connection.connect(function(err){
  if(err){
    console.log("err connecting "+ err.stack);
    return ;
  }
  console.log("connect mysql success!");
});

//The simplest form of .query() is .query(sqlString, callback),
//where a SQL string is the first argument and the second is a callback:
connection.query('select * from Books ', function(err, rows, fields) {
  if (err) throw err;
  console.log('rows : ', rows);
});
//The second form .query(sqlString, values, callback) comes when using placeholder values (see escaping query values):
connection.query('SELECT * FROM  Books  WHERE bookId = ?', ['2'], function (err, results, fields) {
    if(err) throw err;
    console.log("bookId : ", results);
});

connection.query('UPDATE Books SET bookName=? WHERE bookname=?', ['updateName', 'Nodejs'], function(err, result) {
  if (err) throw err;
    console.log('changed ' + result.affectedRows + ' rows');
});

//Stored procedures
//Transactions
connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('INSERT INTO Books (bookName) VALUES (?)', ['Transactions'], function(err, result) {
      if (err) {
        return connection.rollback(function() {
          throw err;
        });
      }
    });
    connection.query('INSERT INTO Books (bookName) VALUES (?)', ['Transactions2'], function(err, result) {
      if (err) {
        return connection.rollback(function() {
          throw err;
        });
      }
    });
    connection.commit(function(err) {
        if (err) {
          return connection.rollback(function() {
            throw err;
          });
        }
        //var query = "SELECT * FROM posts WHERE title=" + mysql.escape("Hello MySQL");
        var queryStr = "DELETE FROM Books WHERE bookName LIKE " + mysql.escape("Transactions%") ;
        console.log("query str : ", queryStr);
        connection.query(queryStr, function(err, result) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('deleted ' + result.affectedRows + ' rows');
        });
      console.log('Transactions Success!');
    });
  });
