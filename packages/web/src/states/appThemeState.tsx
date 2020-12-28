import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle, DarkTheme, LightTheme } from '../styles'
import { AuthContext } from './authState'
import axios from '../services/axios'
import { HttpResponse } from '../typings/HttpResponse'
import { User } from '../typings/User'

export interface AppThemeState {
	config: ChangeThemeTypes
	theme: DefaultTheme
	switchToDarkMode: (config: ChangeThemeTypes) => void
	switchToLightMode: (config: ChangeThemeTypes) => void
	switchToSystemDefault: () => void
	updateUserPreference: (theme: ChangeThemeTypes) => void
}

type ChangeThemeTypes = 'Dark' | 'Light' | 'System'

type AppThemeActionsTypes = 'SHOW_DARK_MODE' | 'SHOW_LIGHT_MODE'

type AppThemeActions = {
	type: AppThemeActionsTypes
	payload: {
		theme: DefaultTheme
		config: ChangeThemeTypes
	}
}

type ReducerHandler = {
	[key in AppThemeActionsTypes]: (action: AppThemeActions) => AppThemeState
}

const initialState: AppThemeState = {
	config: 'Light',
	theme: LightTheme,
	switchToDarkMode: () => null,
	switchToLightMode: () => null,
	updateUserPreference: () => null,
	switchToSystemDefault: () => null
}

export const AppThemeContext = createContext<AppThemeState>(initialState)

const reducer = (state: AppThemeState, action: AppThemeActions) => {
	const reducerHandler: ReducerHandler = {
		SHOW_LIGHT_MODE: action => ({ ...state, theme: action.payload.theme, config: action.payload.config }),
		SHOW_DARK_MODE: action => ({ ...state, theme: action.payload.theme, config: action.payload.config })
	}

	return reducerHandler[action.type](action)
}

const AppThemeState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { user } = useContext(AuthContext)

	const switchToLightMode = (config: ChangeThemeTypes) => {
		dispatch({ type: 'SHOW_LIGHT_MODE', payload: { theme: LightTheme, config } })
	}

	const switchToDarkMode = (config: ChangeThemeTypes) => {
		dispatch({ type: 'SHOW_DARK_MODE', payload: { theme: DarkTheme, config } })
	}

	const getSystemTheme = () => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
	}

	const switchToSystemDefault = useCallback(() => {
		const isDarkMode = getSystemTheme()
		isDarkMode && switchToDarkMode('System')
		!isDarkMode && switchToLightMode('System')
	}, [])

	const updateUserPreference = async (theme: ChangeThemeTypes) => {
		const response = await axios.patch<HttpResponse<User>>('users/preference', { email: user.email, theme })
		return response
	}

	useEffect(() => {
		const userTheme = user?.preferences?.theme
		!userTheme && switchToSystemDefault()
		userTheme === 'Dark' && switchToDarkMode('Dark')
		userTheme === 'Light' && switchToLightMode('Light')
	}, [user, switchToSystemDefault])

	const contextValue: AppThemeState = {
		...state,
		switchToDarkMode,
		switchToLightMode,
		updateUserPreference,
		switchToSystemDefault
	}

	return (
		<AppThemeContext.Provider value={contextValue}>
			<ThemeProvider theme={state.theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</AppThemeContext.Provider>
	)
}

export default AppThemeState
