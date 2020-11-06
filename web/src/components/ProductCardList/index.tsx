import React from 'react'
import { Container } from 'src/styles/GlobalComponents'
import { Product } from 'src/types/models/Product'
import ProductCard from '../ProductCard'

import { SProductCardList } from './styles'

interface ProductCardListProps {
	products: Product[]
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
	return (
		<SProductCardList>
			<Container>
				<div className="product-card__grid">
					{products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</Container>
		</SProductCardList>
	)
}

export default ProductCardList
