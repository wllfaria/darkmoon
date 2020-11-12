import { ProductImage } from './ProductImage'

export interface Product {
	id: number
	images: ProductImage[]
	name: string
	price: string
}
