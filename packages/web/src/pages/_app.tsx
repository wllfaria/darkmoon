import React from 'react'
import { AppProps } from 'next/app'

import AppThemeState from '../states/appThemeState'
import AuthState from '../states/authState'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	return (
		<AppThemeState>
			<AuthState>
				<Component {...pageProps} key={router.route} />
			</AuthState>
		</AppThemeState>
	)
}

export default MyApp
