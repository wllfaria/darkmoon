import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import RolesPermissions from "./rolesPermissions.model";

@Table({ tableName: 'permissions' })
export default class Permissions extends Model<Permissions> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
    @Column({ type: DataType.STRING, allowNull: false })
	name!: string;
    @CreatedAt
    created_at!: Date;
    @UpdatedAt
    updated_at!: Date;
    @DeletedAt
    deleted_at!: Date;

    @HasMany(() => RolesPermissions)
    rolesPermissions!: RolesPermissions[];
}