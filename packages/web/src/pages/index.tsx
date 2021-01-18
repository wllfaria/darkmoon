import React from 'react'
import SaleWarning from '../components/SaleWarning'
import { NextPage } from 'next'
import ProductCardList from '../components/ProductCardList'
import { useTranslation } from '../../i18n'
import MOCK_PRODUCTS from '../mocks/data/products.json'
import { Product } from '../typings/Product'

interface HomePageProps {
	namespacesRequired: string[]
}

const HomePage: NextPage<HomePageProps> = () => {
	const { t } = useTranslation()

	return (
		<>
			<SaleWarning saleWarningText={t('50% off sitewide - drop sale')} />
			<ProductCardList products={MOCK_PRODUCTS as Product[]} />
		</>
	)
}

HomePage.getInitialProps = async (): Promise<HomePageProps> => ({
	namespacesRequired: ['common']
})

export default HomePage
