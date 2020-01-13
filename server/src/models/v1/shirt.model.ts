import { Table, Model, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, HasMany } from "sequelize-typescript";
import ProductModel from "./productModel.model";
import Gender from "./gender.model";
import Sku from "./sku.model";

@Table({ tableName: "dbo_shirts" })
export default class Shirt extends Model<Shirt> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  @ForeignKey(() => Sku)
  sku_id!: number;
  @Column({ type: DataType.REAL, allowNull: false })
  price!: number;
  @Column({ type: DataType.REAL })
  sale_price!: number;
  @Column({ type: DataType.DATE })
  sale_date!: Date;
  @Column({ type: DataType.ENUM('PP', 'P', 'M', 'G', 'GG'), allowNull: false})
  size!: string;
  @ForeignKey(() => ProductModel)
  model_id!: number;
  @ForeignKey(() => Gender)
  gender_id!: number;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;
  @DeletedAt
  deleted_at!: Date;

  @BelongsTo(() => Sku, 'sku_id')
  sku!: Sku;
  @BelongsTo(() => ProductModel, 'model_id')
  model!: ProductModel;
  @BelongsTo(() => Gender, 'gender_id')
  gender!: Gender;
}