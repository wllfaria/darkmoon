import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import { AuthPayload } from '../typings/Auth'
import { User } from '../typings/User'
import axios from '../services/axios'

export interface AuthState {
	user: User
	token: string
	isAuthenticated: boolean
	isAuthenticating: boolean
	authenticate: (authPayload: AuthPayload) => void
	logout: () => void
	updateUser: (user: User) => void
}

type AuthActionTypes = 'AUTHENTICATE' | 'LOGOUT' | 'AUTHENTICATION_FAILED' | 'UPDATE_USER'

type AuthActions = {
	type: AuthActionTypes
	payload?: Partial<AuthState>
}

type ReducerHandler = {
	[key in AuthActionTypes]: (action: AuthActions) => AuthState
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isAuthenticating: true,
	logout: () => null,
	authenticate: () => null,
	updateUser: () => null
}

export const AuthContext = createContext<AuthState>(initialState)

const reducer = (state: AuthState, action: AuthActions) => {
	const reducerHandler: ReducerHandler = {
		AUTHENTICATE: action => ({
			...state,
			user: action.payload.user,
			isAuthenticated: action.payload.isAuthenticated,
			token: action.payload.token
		}),
		AUTHENTICATION_FAILED: () => ({
			...state,
			isAuthenticating: false,
			isAuthenticated: false
		}),
		LOGOUT: () => ({ ...state, user: null, token: null, isAuthenticated: false, isAuthenticating: false }),
		UPDATE_USER: action => ({ ...state, user: action.payload.user })
	}

	return reducerHandler[action.type](action)
}

const AuthState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const saveUserOnLocalStorage = (authPayload: AuthPayload): void => {
		localStorage.setItem('darkmoonuser', JSON.stringify(authPayload))
	}

	const removeUserFromLocalStorage = (): void => {
		localStorage.removeItem('darkmoonuser')
	}

	const getUserFromLocalStorage = () => {
		return localStorage.getItem('darkmoonuser')
	}

	const authenticate = useCallback((authPayload: AuthPayload): void => {
		dispatch({
			type: 'AUTHENTICATE',
			payload: { isAuthenticated: true, user: authPayload.user, token: authPayload.token }
		})
		saveUserOnLocalStorage(authPayload)
	}, [])

	const authenticationFailed = useCallback(() => {
		dispatch({ type: 'AUTHENTICATION_FAILED' })
	}, [])

	const logout = useCallback((): void => {
		dispatch({ type: 'LOGOUT' })
		removeUserFromLocalStorage()
	}, [])

	const updateUser = (user: User) => {
		dispatch({ type: 'UPDATE_USER', payload: { user } })
		const authPayload: AuthPayload = JSON.parse(getUserFromLocalStorage())
		saveUserOnLocalStorage({ token: authPayload.token, user })
	}

	const verifyToken = async (token: string) => {
		try {
			// await axios.get('users/auth', { headers: { Authorization: token } })
			return true
		} catch (err) {
			return false
		}
	}

	const validateLoggedUser = useCallback(async () => {
		const authPayload: AuthPayload = JSON.parse(getUserFromLocalStorage())
		if (!authPayload) {
			authenticationFailed()
			return
		}
		const isTokenValid = await verifyToken(authPayload.token)
		!isTokenValid && logout()
		isTokenValid && authenticate(authPayload)
	}, [logout, authenticationFailed, authenticate])

	useEffect(() => {
		validateLoggedUser()
	}, [validateLoggedUser])

	const contextValue: AuthState = {
		isAuthenticating: state.isAuthenticating,
		isAuthenticated: state.isAuthenticated,
		token: state.token,
		user: state.user,
		authenticate,
		updateUser,
		logout
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthState
