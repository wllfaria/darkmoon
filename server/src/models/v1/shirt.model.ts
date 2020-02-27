import { Table, Model, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, HasMany } from "sequelize-typescript";
import Sku from "./sku.model";
import ProductSize from "./productSize.model";

@Table({ tableName: "shirts" })
export default class Shirt extends Model<Shirt> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @ForeignKey(() => Sku)
  sku_id!: number;
  @ForeignKey(() => ProductSize)
  size_id!: number;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => Sku, 'sku_id')
  sku!: Sku;
  @BelongsTo(() => ProductSize, 'size_id')
  size!: ProductSize;
}