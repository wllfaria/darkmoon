import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import Card from "./card.model";

@Table({ tableName: "card_flags" })
export default class CardFlag extends Model<CardFlag> {
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

  @HasMany(() => Card)
  card!: Card;
}