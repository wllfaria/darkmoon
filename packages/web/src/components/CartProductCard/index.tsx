import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useTranslation } from '../../../i18n'
import { CartContext, CartProduct } from '../../states/cartState'
import { createProductUrl, getUserCurrencySymbol } from '../../utils/productUtils'
import Button from '../Button'
import {
	ProductCardDetails,
	ProductCardHeader,
	ProductCardImg,
	ProductInfo,
	ProductName,
	RemoveProduct,
	SCartProductCard
} from './styles'

interface CartProductProps {
	productInfo: CartProduct
}

const CartProductCard: React.FC<CartProductProps> = ({ productInfo }) => {
	const [removingProduct, setRemovingProduct] = useState(false)
	const { removeProductFromCart } = useContext(CartContext)
	const { t, i18n } = useTranslation()

	const openRemoveProductConfirmation = () => {
		setRemovingProduct(true)
	}

	const removeProduct = () => {
		const shapedName = `${productInfo.product.name} - ${productInfo.selectedSize}`
		removeProductFromCart(shapedName)
	}

	return (
		<SCartProductCard isRemoving={removingProduct}>
			<RemoveProduct isRemoving={removingProduct}>
				<Button type="button" variant="text" size="small">
					<div>
						{!removingProduct && <FontAwesomeIcon onClick={openRemoveProductConfirmation} icon={['fas', 'times']} />}
						{removingProduct && <FontAwesomeIcon onClick={removeProduct} icon={['fas', 'trash']} />}
					</div>
				</Button>
			</RemoveProduct>
			<ProductCardHeader>
				<Link href={createProductUrl(productInfo.product, i18n.language)}>
					<ProductCardImg
						src={productInfo.product.images[0].url}
						alt={productInfo.product.images[0].alt}
						title={productInfo.product.images[0].title}
					/>
				</Link>
				<div>
					<Link href={createProductUrl(productInfo.product, i18n.language)}>
						<ProductName>
							{productInfo.product.name} - {productInfo.selectedSize}
						</ProductName>
					</Link>
					<ProductCardDetails>
						<ProductInfo>
							{t('Quantity')}: {productInfo.quantity}
						</ProductInfo>
						<ProductInfo>
							{t('Price')}: {getUserCurrencySymbol(i18n.language)} {productInfo.product.price * productInfo.quantity}
						</ProductInfo>
					</ProductCardDetails>
				</div>
			</ProductCardHeader>
		</SCartProductCard>
	)
}

export default CartProductCard
