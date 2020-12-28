import { NextPage } from 'next'
import React from 'react'
import withPrivateRoute from '../../../components/PrivateRoute'
import ProfileLayout from '../../../components/ProfileLayout'
import ProfileUserAddress from '../../../components/ProfileUserAddress'

interface ProfileAddressesPageProps {
	namespacesRequired: string[]
}

const ProfileAddressesPage: NextPage<ProfileAddressesPageProps> = () => {
	return (
		<ProfileLayout>
			<ProfileUserAddress pageLink="profile/addresses/new" buttonText="New" />
		</ProfileLayout>
	)
}

ProfileAddressesPage.getInitialProps = async (): Promise<ProfileAddressesPageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(ProfileAddressesPage)
