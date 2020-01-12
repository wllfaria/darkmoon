//const mysql = require('mysql')
import { Sequelize } from 'sequelize-typescript';
import './env';

// It should be safe to store the configuration in this file,
// because of the access pattern from the server.
import * as config from '../db-config.json';
import Connection = require('mysql/lib/Connection');
import Person from './models/person.model';
import Address from './models/address.model';
import PersonsController from './controllers/persons.controller';
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

    this.repository.addModels([Address, Person]);
  }

  async testConnection() {
    await this.repository?.authenticate();
    try {
      console.log("Will create persons.")
      await Person.sync({ force: true });
      await Address.sync({ force: true });
    } catch (e) {
      console.log("Error!", e)
     }
    return null;
  }

  async testTables() {
    // var person = new Person({
    //   first_name: "Willians",
    //   last_name: "Faria",
    //   cpf: "41749257807",
    //   email: "willianasfaria@hotmail.com",
    //   password: "Wfaria10"
    // });
    // await person.save();

    // Person.bulkCreate([{
    //     first_name: "Willians",
    //     last_name: "Faria",
    //     cpf: "41749257807",
    //     email: "willianasfaria@hotmail.com",
    //     password: "Wfaria10"
    //   }, {
    //     first_name: "Artur",
    //     last_name: "Trapp",
    //     cpf: "06341149999",
    //     email: "artptrapp@hotmail.com",
    //     password: "Atrapp10",
    //     addresses: [
    //       {
    //         city: "Dublin",
    //         state: "Co. Dublin",
    //         district: "Ballsbridge"
    //       },
    //       {
    //         city: "Dublin",
    //         state: "Co. Dublin",
    //         district: "Dun Laoghaire"
    //       },
    //     ]
    //   }], { } );

    await Person.create({
      first_name: "Artur",
      last_name: "Trapp",
      cpf: "06341149999",
      email: "artptrapp@hotmail.com",
      password: "Atrapp10",
      addresses: [
        {
          city: "Dublin",
          state: "Co. Dublin",
          district: "Ballsbridge"
        },
        {
          city: "Dublin",
          state: "Co. Dublin",
          district: "Dun Laoghaire"
        },
      ]}, { include: Address }
      );

    // console.log(person);
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