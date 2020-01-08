import { Model } from 'sequelize/types';
import { Table, Column } from 'sequelize-typescript';

@Table({ tableName: "addresses" })
export default class Address extends Model<Address> {
    @Column
    id: number = -1;
    @Column
    person: number = -1;
    @Column
    zip_code: number = -1;
    @Column
    district: string = "";
    @Column
    neighborhood: string = "";
    @Column
    city: string = "";
    @Column
    state: string = "";
    @Column
    number: number = -1;
    @Column
    complement?: string = "";
}