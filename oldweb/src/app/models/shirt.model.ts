import { IProductSize } from './productSize.model';

export interface IShirt {
    id?: number;
    size_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    size: IProductSize;
}
