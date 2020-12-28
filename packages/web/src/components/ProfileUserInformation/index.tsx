import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '../../../i18n'
import { AuthContext } from '../../states/authState'
import { MenuUserImage, ProfileSectionWrapper } from '../../styles/GlobalComponents'
import CircularMonogram from '../CircularMonogram'
import TitleWithButton from '../TitleWithButton'
import { SProfileUserInformation, UserInformation } from './styles'

const ProfileUserInformation: React.FC = () => {
	const { user } = useContext(AuthContext)
	const { t, i18n } = useTranslation()

	return (
		<>
			<ProfileSectionWrapper>
				{!user?.image && user?.username && <CircularMonogram fullString={user.username} />}
				{user?.image && (
					<MenuUserImage
						src={user.image}
						alt={user.username || t('Profile picture')}
						title={user.username || t('Profile picture')}
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
				<SProfileUserInformation>
					{user?.username && (
						<UserInformation>
							<strong>{t('Name')}: </strong>
							{user.username}
						</UserInformation>
					)}
					<UserInformation>
						<strong>{t('Email')}: </strong>
						{user?.email}
					</UserInformation>
					{user?.cpf && (
						<UserInformation>
							<strong>CPF: </strong>
							{user.cpf}
						</UserInformation>
					)}
				</SProfileUserInformation>
			</ProfileSectionWrapper>
		</>
	)
}

export default ProfileUserInformation
