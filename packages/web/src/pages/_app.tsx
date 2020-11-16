import React from 'react'
import { AppProps } from 'next/app'

import AppThemeState from '../states/appThemeState'
import AuthState from '../states/authState'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	return (
		<AuthState>
			<AppThemeState>
				<Component {...pageProps} key={router.route} />
			</AppThemeState>
		</AuthState>
	)
}

export default MyApp
