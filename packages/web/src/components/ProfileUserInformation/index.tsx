import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '../../../i18n'
import { AuthContext } from '../../states/authState'
import { MenuUserImage, ProfileSectionWrapper } from '../../styles/GlobalComponents'
import CircularMonogram from '../CircularMonogram'
import TitleWithButton from '../TitleWithButton'

const ProfileUserInformation: React.FC = () => {
	const { user } = useContext(AuthContext)
	const { t, i18n } = useTranslation()

	return (
		<>
			<ProfileSectionWrapper>
				{!user?.image && user?.name && <CircularMonogram fullString={user.name} />}
				{user?.image && (
					<MenuUserImage
						src={user.image}
						alt={user.name || t('Profile picture')}
						title={user.name || t('Profile picture')}
					/>
				)}
			</ProfileSectionWrapper>
			<ProfileSectionWrapper>
				<TitleWithButton
					title={t('Information')}
					buttonStyling={{ type: 'button', variant: 'outlined', size: 'small' }}
				>
					<Link href={`/${i18n.language}/profile/info/edit`}>{t('Edit')}</Link>
				</TitleWithButton>
				{user?.name && (
					<p>
						<strong>{t('Name')}: </strong>
						{user.name}
					</p>
				)}
				<p>
					<strong>{t('Email')}: </strong>
					{user?.email}
				</p>
				{user?.cpf && (
					<p>
						<strong>CPF: </strong>
						{user.cpf}
					</p>
				)}
			</ProfileSectionWrapper>
		</>
	)
}

export default ProfileUserInformation
