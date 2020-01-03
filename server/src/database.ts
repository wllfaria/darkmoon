const mysql = require('mysql')
import './env';

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DB,
  connectionLimit: 999
})

export function mysqlpool() {
  return new Promise((resolve, reject) => {
    pool.getConnection((error: any, connection: any) => {
      if (error) reject(error);
      resolve(connection);
    });
  });
}

