import { IProductImage } from './productImage.model';
import { IProductType } from './productType.model';
import { IShirt } from './shirt.model';
import { IProductModel } from './productModel.model';
import { IProductGender } from './productGender.model';

export interface ISku {
	id?: number;
	product_name: string;
	product_url: string;
	available: boolean;
	price: number;
	sale_price: number | null;
	sale_date: number | null;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
    type_id: number;
    gender_id: number;
    model_id: number;
	images: IProductImage[];
    type?: IProductType;
    model?: IProductModel;
    gender?: IProductGender;
    shirts?: IShirt[];
}
