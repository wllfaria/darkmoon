import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from '../../../../i18n'
import Button from '../../../components/Button'
import withPrivateRoute from '../../../components/PrivateRoute'
import ProfileLayout from '../../../components/ProfileLayout'
import ProfileUserInformation from '../../../components/ProfileUserInformation'

interface InfoPageProps {
	namespacesRequired: string[]
}

const InfoPage: NextPage<InfoPageProps> = () => {
	const { t, i18n } = useTranslation()

	return (
		<ProfileLayout>
			<ProfileUserInformation />
			<Button type="button" color="primary" variant="outlined">
				<Link href={`/${i18n.language}/profile/info/password`}>{t('Change password')}</Link>
			</Button>
		</ProfileLayout>
	)
}

InfoPage.getInitialProps = async (): Promise<InfoPageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(InfoPage)
