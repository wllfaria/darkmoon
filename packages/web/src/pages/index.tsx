import React from 'react'
import SaleWarning from '../components/SaleWarning'
import { NextPage } from 'next'
import ProductCardList from '../components/ProductCardList'
import { useTranslation } from '../../i18n'
import MOCK_PRODUCTS from '../mocks/data/products.json'

interface HomePageProps {
	namespacesRequired: string[]
}

const HomePage: NextPage<HomePageProps> = () => {
	const { t } = useTranslation()

	return (
		<>
			<SaleWarning saleWarningText={t('50% off sitewide - drop sale')} />
			<ProductCardList products={MOCK_PRODUCTS} />
		</>
	)
}

HomePage.getInitialProps = async (): Promise<HomePageProps> => {
	return {
		namespacesRequired: ['common']
	}
}

export default HomePage
