import { Model, Table, Column, DataType, BelongsTo, ForeignKey, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import Person from './person.model';
import CardFlag from './cardFlag.model';

@Table({tableName: 'cards'})
export default class Card extends Model<Card> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;
  @ForeignKey(() => Person)
  person_id!: number;
  @ForeignKey(() => CardFlag)
  flag_id!: string;
  @Column({ type: DataType.STRING, allowNull: false })
  number!: string;
  @Column({ type: DataType.DATE, allowNull: false })
  expiration!: Date;
  @Column({ type: DataType.STRING, allowNull: false })
  owner!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => Person, 'person_id')
  person!: Person;
  @BelongsTo(() => CardFlag, 'flag_id')
  flag!: CardFlag
}