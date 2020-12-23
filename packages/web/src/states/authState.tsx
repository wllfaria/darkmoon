import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import { AuthPayload } from '../typings/Auth'
import { User } from '../typings/User'

export interface AuthState {
	user: User
	token: string
	isAuthenticated: boolean
	authenticate: (authPayload: AuthPayload) => void
	logout: () => void
}

type AuthActionTypes = 'AUTHENTICATE' | 'LOGOUT'

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
	logout: () => null,
	authenticate: () => null
}

export const AuthContext = createContext<AuthState>(initialState)

const reducer = (state: AuthState, action: AuthActions) => {
	const reducerHandler: ReducerHandler = {
		AUTHENTICATE: action => {
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: action.payload.isAuthenticated,
				token: action.payload.token
			}
		},
		LOGOUT: () => {
			return { ...state, user: null, token: null, isAuthenticated: false }
		}
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

	const authenticate = useCallback((authPayload: AuthPayload): void => {
		dispatch({
			type: 'AUTHENTICATE',
			payload: { isAuthenticated: true, user: authPayload.user, token: authPayload.token }
		})
		saveUserOnLocalStorage(authPayload)
	}, [])

	useEffect(() => {
		const authPayload: AuthPayload = JSON.parse(localStorage.getItem('darkmoonuser'))
		authPayload && authenticate(authPayload)
	}, [authenticate])

	const logout = (): void => {
		dispatch({ type: 'LOGOUT' })
		removeUserFromLocalStorage()
	}

	const contextValue: AuthState = {
		user: state.user,
		token: state.token,
		isAuthenticated: state.isAuthenticated,
		authenticate,
		logout
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthState
