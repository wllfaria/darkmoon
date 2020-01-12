import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import Person from './person.model';

@Table({ tableName: "addresses" })
export default class Address extends Model<Address> {
    @Column({ primaryKey: true, autoIncrementIdentity: true, type: DataType.INTEGER })
    id!: number;
    @ForeignKey(() => Person)
    @Column(DataType.INTEGER)
    personId!: number;
    @Column(DataType.INTEGER)
    zip_code!: number;
    @Column(DataType.STRING)
    district!: string;
    @Column(DataType.STRING)
    neighborhood!: string;
    @Column(DataType.STRING)
    city!: string;
    @Column(DataType.STRING)
    state!: string;
    @Column(DataType.INTEGER)
    houseNumber!: number;
    @Column(DataType.STRING)
    complement!: string;
}