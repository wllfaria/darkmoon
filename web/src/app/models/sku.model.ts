import { IProductImage } from './productImage.model';
import { IProductType } from './productType.model';

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
	images: IProductImage[];
	type: IProductType;
}
