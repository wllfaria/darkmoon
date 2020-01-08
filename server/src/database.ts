//const mysql = require('mysql')
import { Sequelize } from 'sequelize-typescript';
import './env';

// It should be safe to store the configuration in this file,
// because of the access pattern from the server.
import * as config from '../db-config.json';
import Connection = require('mysql/lib/Connection');
import Person from './models/person.model';
//import { QueryError, RowDataPacket } from 'mysql';

export class ModelRepository {
  repository: Sequelize | undefined;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.repository = new Sequelize(config.database, config.username, config.password, {
      dialect: "mysql",
      host: config.host,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    this.repository.addModels([Person]);
  }

  async testConnection() {
    await this.repository?.authenticate();
    try {
      await Person.create({ first_name: "asdasdasd" })
    } catch (e) {
      console.log("Error!", e)
     }
    return null;
  }
}

export function getMySqlConnection(): Promise<Connection> {
  return new Promise((_resolve, _reject) => {
    // pool.getConnection((error: any, connection: Connection) => {
    //   if (error) reject(error);
    //   resolve(connection);
    // });
  });
}