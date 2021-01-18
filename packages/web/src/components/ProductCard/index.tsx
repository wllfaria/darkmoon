import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from '../../../i18n'
import { Product } from '../../typings/Product'
import { createProductUrl, getUserCurrencySymbol } from '../../utils/productUtils'

import { SProductCard } from './styles'

interface ProductCardProps {
	product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [previewImage, setPreviewImage] = useState(product.images[0])
	const { i18n } = useTranslation()

	return (
		<SProductCard>
			<div className="product-card__preview-image-container">
				<Link href={createProductUrl(product, i18n.language)}>
					<img
						className="product-card__preview-image-container__preview-image"
						src={previewImage.url}
						alt={previewImage.alt}
						title={previewImage.title}
					/>
				</Link>
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
				<Link href={createProductUrl(product, i18n.language)}>
					<p className="product-card__product-info__product-name">{product.name}</p>
				</Link>
				<Link href={createProductUrl(product, i18n.language)}>
					<p className="product-card__product-info__product-price">
						{getUserCurrencySymbol(i18n.language)} {product.price}
					</p>
				</Link>
			</div>
		</SProductCard>
	)
}

export default ProductCard
