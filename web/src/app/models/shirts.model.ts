import ProductModels from './productModels.model';
import ProductGenders from './productGenders.model';

export default interface Shirts {
    id?: number;
    size: string;
    gender_id: number;
    model_id: number;
    sku_id: number;
    gender: ProductGenders;
    model: ProductModels;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | undefined;
}