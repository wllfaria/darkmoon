import React, { useContext } from 'react'
import { AuthContext } from '../../../states/authState'

const LoggedInMenu: React.FC = () => {
	const { user } = useContext(AuthContext)

	return (
		<div>
			<p>Hello, {user.name}</p>
		</div>
	)
}

export default LoggedInMenu
