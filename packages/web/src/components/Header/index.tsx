import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LogoWrapper, IconWrapper, SHeader } from './styles'
import UserMenu from './UserMenu'
import Button from '../Button'
import Link from 'next/link'
import { useTranslation } from '../../../i18n'

const Header: React.FC = () => {
	const [userMenuVisible, setUserMenuVisible] = useState(false)
	const { i18n } = useTranslation()

	return (
		<SHeader>
			<IconWrapper onClick={() => setUserMenuVisible(!userMenuVisible)}>
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
			{userMenuVisible && <UserMenu closeMenu={() => setUserMenuVisible(!userMenuVisible)} />}
		</SHeader>
	)
}

export default Header
