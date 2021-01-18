import React from 'react'
import App, { AppProps, AppContext } from 'next/app'
import { appWithTranslation } from '../../i18n'
import '../services/rollbar'
import '../utils/faIcons'
import AppThemeState from '../states/appThemeState'
import CartState from '../states/cartState'
import AuthState from '../states/authState'

import Header from '../components/Header'
import RouterState from '../states/routerState'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	return (
		<RouterState>
			<CartState>
				<AuthState>
					<AppThemeState>
						<Header />
						<Component {...pageProps} key={router.route} />
					</AppThemeState>
				</AuthState>
			</CartState>
		</RouterState>
	)
}

MyApp.getInitialProps = async (appContext: AppContext) => ({ ...(await App.getInitialProps(appContext)) })

export default appWithTranslation(MyApp)
