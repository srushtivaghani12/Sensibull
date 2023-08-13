
const mysql = require('mysql2');


var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'Sensibull'
});

connection.connect(function (err,result) {
    if (err) { console.log(err+" - "+"Database Not Found...") }
    else{
    console.log('You are now connected with mysql Database...')
    }
});

module.exports=connection;

