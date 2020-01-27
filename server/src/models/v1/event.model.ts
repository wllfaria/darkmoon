import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo } from "sequelize-typescript";
import EventType from "./eventType.model";
import EventEntity from "./eventEntity.model";

@Table({ tableName: "events" })
export default class Event extends Model<Event> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;
    @ForeignKey(() => EventType)
    type_id!: number;
    @ForeignKey(() => EventEntity)
    entity_id!: number;
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    description!: string;
    @CreatedAt
    created_at!: Date;
    @UpdatedAt
    updated_at!: Date;
    @DeletedAt
    deleted_at!: Date;

    @BelongsTo(() => EventType)
    type!: EventType;
    @BelongsTo(() => EventEntity)
    entity!: EventEntity;
}