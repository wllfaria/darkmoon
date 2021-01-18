import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../../../i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'
import { RouterContext } from '../../states/routerState'

import { LogoWrapper, IconWrapper, SHeader } from './styles'
import UserMenu from '../UserMenu'
import Button from '../Button'
import CartMenu from '../CartMenu'

const Header: React.FC = () => {
	const [userMenuVisible, setUserMenuVisible] = useState(false)
	const [cartMenuVisible, setCartMenuVisible] = useState(false)
	const { addSubscriber } = useContext(RouterContext)
	const { i18n } = useTranslation()

	const routeChangeObserver = useCallback(() => {
		userMenuVisible && setUserMenuVisible(false)
		cartMenuVisible && setCartMenuVisible(false)
	}, [userMenuVisible, cartMenuVisible])

	useEffect(() => {
		addSubscriber(routeChangeObserver)
	}, [routeChangeObserver])

	return (
		<SHeader>
			<IconWrapper onClick={() => setUserMenuVisible(true)}>
				<Button type="button" variant="text">
					<FontAwesomeIcon icon={['fas', 'user']} />
				</Button>
			</IconWrapper>
			<LogoWrapper>
				<Link href={`/${i18n.language}`}>Darkmoon</Link>
			</LogoWrapper>
			<IconWrapper onClick={() => setCartMenuVisible(true)}>
				<Button type="button" variant="text">
					<FontAwesomeIcon icon={['fas', 'shopping-cart']} />
				</Button>
			</IconWrapper>
			<AnimatePresence>
				{userMenuVisible && <UserMenu closeMenu={() => setUserMenuVisible(!userMenuVisible)} />}
				{cartMenuVisible && <CartMenu closeMenu={() => setCartMenuVisible(!cartMenuVisible)} />}
			</AnimatePresence>
		</SHeader>
	)
}

export default Header
