import React, { createContext, useEffect, useReducer } from 'react'

export interface IAuthState {
	// ToDo - change from only token to full user
	user: string
	isAuthenticating: boolean
	isAuthenticated: boolean
	loginErrorReason: string
	login: (username: string, password: string) => Promise<boolean>
	logout: () => Promise<void>
}

type TAuthActionTypes = 'LOGIN' | 'LOGIN_SUCCESS' | 'LOGIN_ERROR' | 'LOGOUT'

type TAuthActions = {
	type: TAuthActionTypes
	payload: IAuthState
}

type TReduceHandler = {
	[key in TAuthActionTypes]: (action: TAuthActions) => IAuthState
}

const initialState: IAuthState = {
	user: null,
	isAuthenticated: false,
	login: () => Promise.resolve(false),
	logout: () => Promise.resolve(),
	isAuthenticating: false,
	loginErrorReason: null
}

export const AuthContext = createContext<IAuthState>(initialState)

const reducer = (state: IAuthState, action: TAuthActions) => {
	const reducerHandler: TReduceHandler = {
		LOGIN: () => {
			return { ...state, isAuthenticating: true, isAuthenticated: false }
		},
		LOGIN_ERROR: action => {
			return { ...state, loginErrorReason: action.payload.loginErrorReason, isAuthenticated: false }
		},
		LOGIN_SUCCESS: () => {
			return { ...state, isAuthenticated: true }
		},
		LOGOUT: () => {
			return { ...state, isAuthenticating: false, isAuthenticated: false }
		}
	}

	return reducerHandler[action.type](action)
}

const AuthState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const user = localStorage.getItem('darkmoonuser')
		if (user) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: { ...state, isAuthenticated: true, user } })
		}
	})

	const login = (_username: string, _password: string): Promise<boolean> => {
		return new Promise(resolve => {
			resolve(false)
		})
	}

	const logout = (): Promise<void> => {
		return Promise.resolve()
	}

	const contextValue: IAuthState = {
		user: state.user,
		isAuthenticated: state.isAuthenticated,
		isAuthenticating: state.isAuthenticating,
		loginErrorReason: state.loginErrorReason,
		login,
		logout
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthState
