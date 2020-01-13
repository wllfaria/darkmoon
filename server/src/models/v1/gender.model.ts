import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import Shirt from "./shirt.model";

@Table({ tableName: "dbo_genders" })
export default class Gender extends Model<Gender> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @HasMany(() => Shirt)
  shirt!: Shirt;
}