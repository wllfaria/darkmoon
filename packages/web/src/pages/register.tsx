import { NextPage } from 'next'
import React from 'react'

interface RegisterPageProps {
	namespacesRequired: string[]
}

const RegisterPage: NextPage<RegisterPageProps> = () => {
	return <h1>RegisterPage</h1>
}

RegisterPage.getInitialProps = async (): Promise<RegisterPageProps> => ({
	namespacesRequired: ['common']
})

export default RegisterPage
