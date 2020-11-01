import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AppThemeState from './states/appThemeState'

import HomePage from './pages/HomePage'

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={HomePage} exact />
			</Switch>
		</BrowserRouter>
	)
}

const App: React.FC = () => {
	return (
		<AppThemeState>
			<Routes />
		</AppThemeState>
	)
}

export default App
