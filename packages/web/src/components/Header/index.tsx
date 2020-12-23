import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../../../i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'
import { RouterContext } from '../../states/routerState'

import { LogoWrapper, IconWrapper, SHeader } from './styles'
import UserMenu from './UserMenu'
import Button from '../Button'

const Header: React.FC = () => {
	const [userMenuVisible, setUserMenuVisible] = useState(false)
	const { addSubscriber } = useContext(RouterContext)
	const { i18n } = useTranslation()

	const routeChangeObserver = useCallback(() => userMenuVisible && setUserMenuVisible(false), [userMenuVisible])

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
			<IconWrapper>
				<Button type="button" variant="text">
					<FontAwesomeIcon icon={['fas', 'shopping-cart']} />
				</Button>
			</IconWrapper>
			<AnimatePresence>
				{userMenuVisible && <UserMenu closeMenu={() => setUserMenuVisible(!userMenuVisible)} />}
			</AnimatePresence>
		</SHeader>
	)
}

export default Header
