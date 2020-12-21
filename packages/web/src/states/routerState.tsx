import { useRouter } from 'next/router'
import React, { createContext, useCallback, useEffect, useReducer } from 'react'

interface RouterState {
	subscribers: (() => void)[]
	addSubscriber: (subscriber: () => void) => void
}

const initialState: RouterState = {
	subscribers: [],
	addSubscriber: () => null
}

type RouterActionTypes = 'ADD_SUBSCRIBER'

type RouterActions = {
	type: RouterActionTypes
	payload: () => void
}

type ReducerHandler = {
	[key in RouterActionTypes]: (action: RouterActions) => RouterState
}

const reducer = (state: RouterState, action: RouterActions) => {
	const reducerHandler: ReducerHandler = {
		ADD_SUBSCRIBER: action => {
			state.subscribers.push(action.payload)
			return { ...state }
		}
	}
	return reducerHandler[action.type](action)
}

export const RouterContext = createContext<RouterState>(initialState)

const RouterState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const router = useRouter()

	const addSubscriber = (subscriber: () => void) => {
		dispatch({ type: 'ADD_SUBSCRIBER', payload: subscriber })
	}

	const notifySubscribers = useCallback(() => {
		state.subscribers.forEach(subscriber => subscriber())
	}, [state.subscribers])

	useEffect(() => notifySubscribers(), [router.pathname, notifySubscribers])

	const contextValue: RouterState = {
		...state,
		addSubscriber
	}

	return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>
}

export default RouterState
