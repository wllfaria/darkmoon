import { NextPage } from 'next'
import React from 'react'
import withPrivateRoute from '../../components/PrivateRoute'
import ProfileUserAddress from '../../components/ProfileUserAddress'
import ProfileLayout from '../../components/ProfileLayout'
import ProfileUserInformation from '../../components/ProfileUserInformation'
import { useTranslation } from '../../../i18n'

interface ProfilePageProps {
	namespacesRequired: string[]
}

const ProfilePage: NextPage<ProfilePageProps> = () => {
	const { t } = useTranslation()

	return (
		<ProfileLayout>
			<div>
				<ProfileUserInformation />
				<ProfileUserAddress pageLink="profile/addresses" buttonText={t('Edit')} />
			</div>
		</ProfileLayout>
	)
}

ProfilePage.getInitialProps = async (): Promise<ProfilePageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(ProfilePage)
