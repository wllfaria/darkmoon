import * as crypto from 'crypto';
import '../env';
import { Model, DataType, HasMany } from 'sequelize-typescript';
import { Table, Column } from 'sequelize-typescript';
import Address from './address.model';

@Table({ tableName: "persons" })
export default class Person extends Model<Person> {

  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;
  @Column(DataType.TEXT)
  first_name!: string;
  @Column(DataType.TEXT)
  last_name!: string;
  @Column(DataType.TEXT)
  cpf!: string ;
  @Column(DataType.DATE)
  birthdate!: Date;
  @Column(DataType.TEXT)
  email!: string;
  @Column(DataType.TEXT)
  password!: string;
  @Column(DataType.TEXT)
  salt?: string;
  @Column(DataType.BOOLEAN)
  email_confirmed!: boolean;
  
  @HasMany(() => Address)
  addresses!: Address[];

  private generateSalt(): string {
    return crypto.randomBytes(Number(process.env.CRYPTOSALT)).toString(String(process.env.CRYPTOSTRING));
  }

  private encodePassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(<BinaryType>password, salt, Number(process.env.CRYPTOITERATIONS), Number(process.env.CRYPTOKEYLEN), String(process.env.CRYPTOALGORITHM)).toString(String(process.env.CRYPTOSTRING));
  }

  // public fullRegister(person: Persons) {
  //   person['salt'] = this.generateSalt();
  //   person['password'] = this.encodePassword(<string>person.password, person.salt);

  //   return new Promise(async (resolve, reject) => {
  //     const conn: any = await getMySqlConnection();
  //     conn.query(
  //       `
  //         insert into persons set ?
  //       `,
  //       person,
  //       async (error: QueryError, results: OkPacket) => {
  //         conn.release();
  //         if (error) reject(error);
  //         let person: Persons = await this.getById(results.insertId)
  //         resolve(person);
  //       }
  //     )
  //   })
  // }

  // public getById(personId: number): Promise<Persons> {
  //   return new Promise(async (resolve, reject) => {
  //     const conn: any = await getMySqlConnection();
  //     conn.query(
  //       `
  //         select
  //         *
  //         from persons
  //         where id = ?
  //       `,
  //       personId,
  //       (error: QueryError, results: RowDataPacket[]) => {
  //         conn.release();
  //         if (error) reject(error);
  //         resolve(<Persons>results[0])
  //       }
  //     )
  //   })
  // }
}