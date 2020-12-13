import { NextPage } from 'next'
import React from 'react'

interface LoginPageProps {
	namespacesRequired: string[]
}

const LoginPage: NextPage<LoginPageProps> = () => {
	return <h1>LoginPage</h1>
}

LoginPage.getInitialProps = async (): Promise<LoginPageProps> => ({
	namespacesRequired: ['common']
})

export default LoginPage
