import React from 'react'
import ProductCardList from 'src/components/ProductCardList'

import MOCK_PRODUCTS from '../mocks/data/products.json'

import SaleWarning from '../components/SaleWarning'

const HomePage: React.FC = () => {
	return (
		<>
			<SaleWarning saleWarningText="50% off em todo o site PROMOÇÃO DE LANÇAMENTO" />
			<ProductCardList products={MOCK_PRODUCTS} />
		</>
	)
}

export default HomePage
