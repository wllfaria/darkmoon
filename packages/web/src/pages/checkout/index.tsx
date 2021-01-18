import { NextPage } from 'next'
import React, { useContext } from 'react'
import { useTranslation } from '../../../i18n'
import { CartContext } from '../../states/cartState'
import { Container } from '../../styles/GlobalComponents'
import { CheckoutList, CheckoutListItem, CheckoutWrapper, OrderPrice } from '../../styles/pages/checkout/index.styles'
import { getUserCurrencySymbol } from '../../utils/productUtils'

interface CheckoutPageProps {
	namespacesRequired: string[]
}

const CheckoutPage: NextPage<CheckoutPageProps> = () => {
	const { products } = useContext(CartContext)
	const { i18n } = useTranslation()

	const getTotalCartPrice = (): string => {
		const totalPrice = Object.keys(products).reduce((initial, key) => {
			initial += products[key].product.price * products[key].quantity
			return initial
		}, 0)
		return totalPrice.toFixed(2)
	}

	return (
		<Container>
			<CheckoutWrapper>
				<CheckoutList>
					{Object.keys(products).map(key => (
						<CheckoutListItem key={key}>
							<p>
								<strong>
									{products[key].product.name} - {products[key].selectedSize} ({products[key].quantity}x)
								</strong>
							</p>
							<p>
								{getUserCurrencySymbol(i18n.language)} {products[key].quantity * products[key].product.price}
							</p>
						</CheckoutListItem>
					))}
					<OrderPrice>
						<strong>Total</strong>
						<strong>{getTotalCartPrice()}</strong>
					</OrderPrice>
				</CheckoutList>
			</CheckoutWrapper>
		</Container>
	)
}

CheckoutPage.getInitialProps = async (): Promise<CheckoutPageProps> => ({
	namespacesRequired: ['common']
})

export default CheckoutPage
