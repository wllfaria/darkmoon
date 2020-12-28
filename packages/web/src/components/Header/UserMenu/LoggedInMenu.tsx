import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '../../../../i18n'
import { AuthContext } from '../../../states/authState'
import Button from '../../Button'
import CircularMonogram from '../../CircularMonogram'
import { BackIcon, BackIconWrapper } from '../styles'
import { MenuUserContent, MenuUserGreeting, MenuUserInfo, MenuUserName } from './styles'
import { LinkWrapper, MenuLink, MenuUserImage } from '../../../styles/GlobalComponents'

interface LoggedInMenuProps {
	closeMenu: () => void
}

const LoggedInMenu: React.FC<LoggedInMenuProps> = ({ closeMenu }) => {
	const { user, logout } = useContext(AuthContext)
	const { t, i18n } = useTranslation()

	const getRandomGreeting = () => {
		const greetings = ['Welcome back', 'Hello', 'Howdy', 'Nice to see you again']
		const randomGreetingIndex = Math.floor(Math.random() * greetings.length)
		return greetings[randomGreetingIndex]
	}

	const handleLogout = () => {
		logout()
		closeMenu()
	}

	return (
		<>
			<BackIconWrapper>
				<Button onClick={closeMenu} type="button" variant="text">
					<BackIcon>
						<FontAwesomeIcon onClick={closeMenu} icon={['fas', 'arrow-left']} />
					</BackIcon>
				</Button>
			</BackIconWrapper>
			<div>
				{user?.username && (
					<MenuUserInfo>
						<div>
							{user?.image && (
								<MenuUserImage
									src={user.image}
									alt={user.username || t('Profile picture')}
									title={user.username || t('Profile picture')}
								/>
							)}
							{!user?.image && <CircularMonogram fullString={user.username} />}
						</div>
						<MenuUserContent>
							<MenuUserGreeting>{t(getRandomGreeting())},</MenuUserGreeting>
							<MenuUserName>{user.username}</MenuUserName>
						</MenuUserContent>
					</MenuUserInfo>
				)}
				<LinkWrapper>
					<MenuLink>
						<Link href={`/${i18n.language}/profile`}>
							<div>
								<FontAwesomeIcon onClick={closeMenu} icon={['fas', 'user']} />
							</div>
						</Link>
						<Link href={`/${i18n.language}/profile`}>{t('Profile')}</Link>
					</MenuLink>
				</LinkWrapper>
				<LinkWrapper>
					<MenuLink>
						<Link href={`/${i18n.language}/profile/orders`}>
							<div>
								<FontAwesomeIcon onClick={closeMenu} icon={['fas', 'receipt']} />
							</div>
						</Link>
						<Link href={`/${i18n.language}/profile/orders`}>{t('My orders')}</Link>
					</MenuLink>
				</LinkWrapper>
				<LinkWrapper>
					<MenuLink>
						<Link href={`/${i18n.language}/profile/wishlist`}>
							<div>
								<FontAwesomeIcon onClick={closeMenu} icon={['fas', 'heart']} />
							</div>
						</Link>
						<Link href={`/${i18n.language}/profile/wishlist`}>{t('Wishlist')}</Link>
					</MenuLink>
				</LinkWrapper>
				<LinkWrapper>
					<MenuLink>
						<Link href={`/${i18n.language}/profile/addresses`}>
							<div>
								<FontAwesomeIcon onClick={closeMenu} icon={['fas', 'map-marker']} />
							</div>
						</Link>
						<Link href={`/${i18n.language}/profile/addresses`}>{t('Addresses')}</Link>
					</MenuLink>
				</LinkWrapper>
				<LinkWrapper>
					<MenuLink>
						<div onClick={handleLogout}>
							<FontAwesomeIcon onClick={handleLogout} icon={['fas', 'sign-out-alt']} />
						</div>
						<div onClick={handleLogout}>{t('Sign out')}</div>
					</MenuLink>
				</LinkWrapper>
			</div>
		</>
	)
}

export default LoggedInMenu
