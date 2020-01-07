import { mysqlpool } from '../database';
import * as crypto from 'crypto';
import '../env';

import Persons from '../interfaces/persons.interface';
import { QueryError, RowDataPacket, OkPacket } from 'mysql';

export default class PersonsModel {
  constructor() {}

  private generateSalt(): string {
    return crypto.randomBytes(Number(process.env.CRYPTOSALT)).toString(String(process.env.CRYPTOSTRING));
  }

  private encodePassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(<BinaryType>password, salt, Number(process.env.CRYPTOITERATIONS), Number(process.env.CRYPTOKEYLEN), String(process.env.CRYPTOALGORITHM)).toString(String(process.env.CRYPTOSTRING));
  }

  public fullRegister(person: Persons) {
    person['salt'] = this.generateSalt();
    person['password'] = this.encodePassword(<string>person.password, person.salt);

    return new Promise(async (resolve, reject) => {
      const conn: any = await mysqlpool();
      conn.query(
        `
          insert into persons set ?
        `,
        person,
        async (error: QueryError, results: OkPacket) => {
          conn.release();
          if(error) reject(error);
          let person: Persons = await this.getById(results.insertId)
          resolve(person);
        }
      )
    })
  }

  public getById(personId: number): Promise<Persons> {
    return new Promise(async (resolve, reject) => {
      const conn: any = await mysqlpool();
      conn.query(
        `
          select
          *
          from persons
          where id = ?
        `,
        personId,
        (error: QueryError, results: RowDataPacket[]) => {
          conn.release();
          if(error) reject(error);
          resolve(<Persons>results[0])
        }
      )
    })
  }
}