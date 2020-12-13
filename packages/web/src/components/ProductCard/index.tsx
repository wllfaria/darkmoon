import React, { useState } from 'react'
import { Product } from '../../typings/Product'
import Button from '../Button'

import { SProductCard } from './styles'

interface ProductCardProps {
	product: Product
}

/**
 * TODO: After defining how the products are gonna be stored on the backend, We need to make it redirect the user to that product
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [previewImage, setPreviewImage] = useState(product.images[0])

	const addProductToCart = (product: Product) => {
		console.log(product)
	}

	return (
		<SProductCard>
			<div className="product-card__preview-image-container">
				<div className="product-card__preview-image-container__add-to-cart" onClick={() => addProductToCart(product)}>
					<Button type="button" variant="outlined" color="primary" textColor="light">
						Add to cart
					</Button>
				</div>
				<img
					className="product-card__preview-image-container__preview-image"
					src={previewImage.url}
					alt={previewImage.alt}
					title={previewImage.title}
				/>
			</div>

			<div className="product-card__image-knobs-container">
				{product.images.map(image => (
					<div
						className={`product-card__image-knobs-container__image-knob ${
							previewImage.id === image.id ? 'active' : ''
						}`}
						key={image.id}
						onClick={() => setPreviewImage(image)}
					></div>
				))}
			</div>

			<div className="product-card__product-info">
				<p className="product-card__product-info__product-name">{product.name}</p>
				<p className="product-card__product-info__product-price">{product.price}</p>
			</div>
		</SProductCard>
	)
}

export default ProductCard
