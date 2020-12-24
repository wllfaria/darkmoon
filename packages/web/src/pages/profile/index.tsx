import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from '../../../i18n'
import ProfileLayout from '../../components/ProfileLayout'
import ProfileUserInformation from '../../components/ProfileUserInformation'
import TitleWithButton from '../../components/TitleWithButton'
import { ProfileSectionWrapper } from '../../styles/GlobalComponents'

interface ProfilePageProps {
	namespacesRequired: string[]
}

const ProfilePage: NextPage = () => {
	const { t, i18n } = useTranslation()

	return (
		<ProfileLayout>
			<div>
				<ProfileUserInformation />
				<ProfileSectionWrapper>
					<TitleWithButton
						title={t('Addresses')}
						buttonStyling={{ type: 'button', variant: 'outlined', size: 'small' }}
					>
						<Link href={`/${i18n.language}/profile/addresses/edit`}>{t('Edit')}</Link>
					</TitleWithButton>
				</ProfileSectionWrapper>
			</div>
		</ProfileLayout>
	)
}

ProfilePage.getInitialProps = async (): Promise<ProfilePageProps> => ({
	namespacesRequired: ['common']
})

export default ProfilePage
