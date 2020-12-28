import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from '../../../i18n'
import { AuthContext } from '../../states/authState'
import { Container, LinkWrapper, MenuLink } from '../../styles/GlobalComponents'
import { SProfileLayout } from './styles'

const ProfileLayout: React.FC = ({ children }) => {
	const [currentRoute, setCurrentRoute] = useState('')
	const { logout } = useContext(AuthContext)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	useEffect(() => {
		setCurrentRoute(router.pathname)
	}, [router.pathname])

	const isActive = (route: string, exact?: boolean) => {
		if (exact) return currentRoute === route
		return currentRoute.includes(route)
	}

	return (
		<Container>
			<SProfileLayout>
				<div>
					<LinkWrapper>
						<MenuLink active={isActive('/profile', true)}>
							<Link href={`/${i18n.language}/profile`}>
								<div>
									<FontAwesomeIcon icon={['fas', 'bars']} />
								</div>
							</Link>
							<Link href={`/${i18n.language}/profile`}>{t('Panel')}</Link>
						</MenuLink>
					</LinkWrapper>
					<LinkWrapper>
						<MenuLink active={isActive('/profile/info')}>
							<Link href={`/${i18n.language}/profile/info`}>
								<div>
									<FontAwesomeIcon icon={['fas', 'user']} />
								</div>
							</Link>
							<Link href={`/${i18n.language}/profile/info`}>{t('Profile')}</Link>
						</MenuLink>
					</LinkWrapper>
					<LinkWrapper>
						<MenuLink active={isActive('/profile/appearance')}>
							<Link href={`/${i18n.language}/profile/appearance`}>
								<div>
									<FontAwesomeIcon icon={['fas', 'paint-brush']} />
								</div>
							</Link>
							<Link href={`/${i18n.language}/profile/appearance`}>{t('Appearance')}</Link>
						</MenuLink>
					</LinkWrapper>
					<LinkWrapper>
						<MenuLink active={isActive('/profile/orders')}>
							<Link href={`/${i18n.language}/profile/orders`}>
								<div>
									<FontAwesomeIcon icon={['fas', 'receipt']} />
								</div>
							</Link>
							<Link href={`/${i18n.language}/profile/orders`}>{t('My orders')}</Link>
						</MenuLink>
					</LinkWrapper>
					<LinkWrapper>
						<MenuLink active={isActive('/profile/wishlist')}>
							<Link href={`/${i18n.language}/profile/wishlist`}>
								<div>
									<FontAwesomeIcon icon={['fas', 'heart']} />
								</div>
							</Link>
							<Link href={`/${i18n.language}/profile/wishlist`}>{t('Wishlist')}</Link>
						</MenuLink>
					</LinkWrapper>
					<LinkWrapper>
						<MenuLink active={isActive('/profile/addresses')}>
							<Link href={`/${i18n.language}/profile/addresses`}>
								<div>
									<FontAwesomeIcon icon={['fas', 'map-marker']} />
								</div>
							</Link>
							<Link href={`/${i18n.language}/profile/addresses`}>{t('Addresses')}</Link>
						</MenuLink>
					</LinkWrapper>
					<LinkWrapper>
						<MenuLink>
							<div onClick={logout}>
								<FontAwesomeIcon onClick={logout} icon={['fas', 'sign-out-alt']} />
							</div>
							<div onClick={logout}>{t('Sign out')}</div>
						</MenuLink>
					</LinkWrapper>
				</div>
				<div>{children}</div>
			</SProfileLayout>
		</Container>
	)
}

export default ProfileLayout
