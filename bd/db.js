// db/db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'luis',
  password: 'Dedalus',
  database: 'login_hash'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL!');
});

module.exports = connection;