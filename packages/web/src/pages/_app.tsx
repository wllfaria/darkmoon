import React from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { appWithTranslation } from '../../i18n'
import '../services/rollbar'
import '../utils/faIcons'

import AppThemeState from '../states/appThemeState'
import AuthState from '../states/authState'
import Header from '../components/Header'
import RouterState from '../states/routerState'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	return (
		<AppThemeState>
			<RouterState>
				<AuthState>
					<Header />
					<Component {...pageProps} key={router.route} />
				</AuthState>
			</RouterState>
		</AppThemeState>
	)
}

MyApp.getInitialProps = async (appContext: AppContext) => ({ ...(await App.getInitialProps(appContext)) })

export default appWithTranslation(MyApp)
