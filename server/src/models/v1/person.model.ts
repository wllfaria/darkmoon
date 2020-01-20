import * as crypto from 'crypto';
import '../../env';
import { Table, Model, Column, DataType, HasMany, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import Address from './address.model';
import Card from './card.model';

@Table({ tableName: "persons" })
export default class Person extends Model<Person> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  @Column({ type: DataType.STRING, allowNull: false })
  cpf!: string;
  @Column({ type: DataType.DATE })
  birthdate!: Date;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;
  @Column({ type: DataType.BOOLEAN })
  email_confirmed!: boolean;
  @Column({ type: DataType.STRING })
  password!: string;
  @Column({ type: DataType.STRING })
  password_old!: string;
  @Column({ type: DataType.DATE })
  password_changed!: Date;
  @Column({ type: DataType.TEXT })
  salt!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;
  
  @HasMany(() => Address)
  addresses!: Address[];
  @HasMany(() => Card)
  cards!: Card[];

  private generateSalt(): string {
    return crypto.randomBytes(Number(process.env.CRYPTOSALT)).toString(String(process.env.CRYPTOSTRING));
  }

  private encodePassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(<BinaryType>password, salt, Number(process.env.CRYPTOITERATIONS), Number(process.env.CRYPTOKEYLEN), String(process.env.CRYPTOALGORITHM)).toString(String(process.env.CRYPTOSTRING));
  }
}