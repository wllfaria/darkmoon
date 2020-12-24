import { NextPage } from 'next'
import React from 'react'
import ProfileLayout from '../../../components/ProfileLayout'

interface InfoEditPageProps {
	namespacesRequired: string[]
}

const InfoEditPage: NextPage<InfoEditPageProps> = () => {
	return (
		<ProfileLayout>
			<h1>test</h1>
			<h1>page</h1>
		</ProfileLayout>
	)
}

InfoEditPage.getInitialProps = async (): Promise<InfoEditPageProps> => ({
	namespacesRequired: ['common']
})

export default InfoEditPage
