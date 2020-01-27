import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import EventType from "./eventType.model";
import Event from "./event.model";

@Table({ tableName: "event_entities" })
export default class EventEntity extends Model<EventEntity> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;
    @CreatedAt
    created_at!: Date;
    @UpdatedAt
    updated_at!: Date;
    @DeletedAt
    deleted_at!: Date;

    @HasMany(() => EventType)
    types!: EventType[];
    @HasMany(() => Event)
    events!: Event[];
}