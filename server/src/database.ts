const mysql = require('mysql')
import './env';
import fs from "fs";

// It should be safe to store the configuration in this file,
// because of the access pattern from the server.
import * as config from '../db-config.json';
import Connection = require('mysql/lib/Connection');
import { QueryError, RowDataPacket } from 'mysql';

const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  password: config.password,
  //database: config.database,
  connectionLimit: 10
})

export function getMySqlConnection(): Promise<Connection> {
  return new Promise((resolve, reject) => {
    pool.getConnection((error: any, connection: Connection) => {
      if (error) reject(error);
      resolve(connection);
    });
  });
}

export async function testConnection() {
  const conn = await getMySqlConnection();
  return new Promise((resolve, reject) => {
    conn.query("SHOW DATABASES", (error: QueryError, result: RowDataPacket[]) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}

export async function spawnDatabase() {
  const conn = await getMySqlConnection();
  const query = fs.readFileSync("disheartened.sql").toString();
  console.log(query);
}