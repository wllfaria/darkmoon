import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Shirt from "./shirt.model";
import ProductType from "./productType.model";
import ProductImage from "./productImage.model";
import ProductModel from "./productModel.model";
import Gender from "./gender.model";

@Table({ tableName: "skus" })
export default class Sku extends Model<Sku> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  product_name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  product_url!: string;

  @ForeignKey(() => ProductType)
  type_id!: number;

  @ForeignKey(() => ProductModel)
  model_id!: number;

  @ForeignKey(() => Gender)
  gender_id!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, unique: true })
  available!: boolean;

  @Column({ type: DataType.REAL, allowNull: false })
  price!: number;

  @Column({ type: DataType.REAL })
  sale_price!: number;

  @Column({ type: DataType.DATE })
  sale_date!: Date;

  @BelongsTo(() => ProductType)
  type!: ProductType;

  @BelongsTo(() => ProductModel)
  model!: ProductType;

  @BelongsTo(() => Gender)
  gender!: Gender;

  @HasMany(() => Shirt)
  shirts!: Shirt[];
  
  @HasMany(() => ProductImage)
  images!: ProductImage[];
}