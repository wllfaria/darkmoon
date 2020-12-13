import React from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { appWithTranslation } from '../../i18n'
import { AnimatePresence } from 'framer-motion'
import '../services/rollbar'
import '../utils/faIcons'

import AppThemeState from '../states/appThemeState'
import AuthState from '../states/authState'
import Header from '../components/Header'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	return (
		<AppThemeState>
			<AuthState>
				<AnimatePresence>
					<Header />
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
			</AuthState>
		</AppThemeState>
	)
}

MyApp.getInitialProps = async (appContext: AppContext) => ({ ...(await App.getInitialProps(appContext)) })

export default appWithTranslation(MyApp)
