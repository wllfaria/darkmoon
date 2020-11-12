import React from 'react'
import { AppProps } from 'next/app'

import AppThemeState from '../states/appThemeState'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	return (
		<AppThemeState>
			<Component {...pageProps} key={router.route} />
		</AppThemeState>
	)
}

export default MyApp
