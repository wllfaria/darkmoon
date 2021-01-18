import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from '../../../i18n'
import Button from '../Button'
import { BackIcon, BackIconWrapper } from '../Header/styles'
import { LinkWrapper } from '../../styles/GlobalComponents'

interface LoggedOutMenuProps {
	closeMenu: () => void
}

const LoggedOutMenu: React.FC<LoggedOutMenuProps> = ({ closeMenu }) => {
	const router = useRouter()
	const { t, i18n } = useTranslation()

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
				<LinkWrapper>
					<Button
						onClick={() => router.push(`/${i18n.language}/login`)}
						type="button"
						fullWidth
						variant="outlined"
						size="large"
					>
						<Link href={`/${i18n.language}/login`}>{t('Login')}</Link>
					</Button>
				</LinkWrapper>
				<Button
					onClick={() => router.push(`/${i18n.language}/register`)}
					type="button"
					fullWidth
					color="primary"
					size="large"
				>
					<Link href={`/${i18n.language}/register`}>{t('Sign up')}</Link>
				</Button>
			</div>
		</>
	)
}

export default LoggedOutMenu
