
require('dotenv').config();
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     // Your MySQL username
//     user: process.env.DB_USER,
//     // Your MySQL password
//     password: (process.env.DB_PW),
//     database: 'employeetrackdb'
//   });
  const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: process.env.DB_USER,
    // Your MySQL password
    password: (process.env.DB_PW),    database: 'employeetrackdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = pool;