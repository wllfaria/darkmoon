import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../states/authState'
import router from 'next/router'

export default function withPrivateRoute<T>(RouteComponent: React.FC, props?: T): React.FC {
	const WrappedRoute: React.FC = () => {
		const { isAuthenticated } = useContext(AuthContext)

		useEffect(() => {
			!isAuthenticated && router.replace({ pathname: '/login', query: { next: router.pathname.replaceAll('/', '') } })
		}, [isAuthenticated])

		return <RouteComponent {...props} />
	}
	return WrappedRoute
}
