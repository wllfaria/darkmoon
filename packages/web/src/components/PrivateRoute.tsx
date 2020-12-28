import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../states/authState'
import router from 'next/router'
import { NextPage } from 'next'

export default function withPrivateRoute<T>(RouteComponent: React.FC, props?: T): React.FC {
	const WrappedRoute: NextPage = () => {
		const { isAuthenticated, isAuthenticating } = useContext(AuthContext)

		useEffect(() => {
			!isAuthenticating && !isAuthenticated && router.replace({ pathname: '/login', query: { next: router.pathname } })
		}, [isAuthenticated, isAuthenticating])

		return <RouteComponent {...props} />
	}
	return WrappedRoute
}
