import { Table, Model, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import Sku from "./sku.model";


@Table({ tableName: "dbo_product_images" })
export default class ProductImage extends Model<ProductImage> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  url!: string;
  @ForeignKey(() => Sku)
  sku_id!: number;
  @Column({ type: DataType.STRING, allowNull: false })
  alt!: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => Sku)
  sku!: Sku;
}