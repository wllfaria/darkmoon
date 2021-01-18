import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '../../../i18n'
import { CartContext } from '../../states/cartState'
import Button from '../Button'
import CartProductCard from '../CartProductCard'
import { BackIcon, BackIconWrapper, MenuOverlay, SlideMenu } from '../Header/styles'
import { CartHeader, CartItems, SCartMenu } from './styles'

interface CartMenuProps {
	closeMenu: () => void
}

const CartMenu: React.FC<CartMenuProps> = ({ closeMenu }) => {
	const { products } = useContext(CartContext)
	const { t, i18n } = useTranslation()

	return (
		<>
			<SlideMenu transition={{ type: 'just' }} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
				<BackIconWrapper>
					<Button onClick={closeMenu} type="button" variant="text">
						<BackIcon>
							<FontAwesomeIcon onClick={closeMenu} icon={['fas', 'arrow-left']} />
						</BackIcon>
					</Button>
				</BackIconWrapper>
				<CartHeader>{t('Cart')}</CartHeader>
				<SCartMenu>
					<CartItems>
						{products && Object.keys(products).map(key => <CartProductCard key={key} productInfo={products[key]} />)}
					</CartItems>

					<Button type="button" color="primary" size="large" fullWidth>
						<Link href={`/${i18n.language}/checkout`}>{t('Buy now')}</Link>
					</Button>
				</SCartMenu>
			</SlideMenu>
			<MenuOverlay
				onClick={closeMenu}
				transition={{ delay: 0.1 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
				exit={{ opacity: 0 }}
			></MenuOverlay>
		</>
	)
}

export default CartMenu
