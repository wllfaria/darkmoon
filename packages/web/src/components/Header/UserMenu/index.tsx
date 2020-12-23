import React, { useContext } from 'react'
import { MenuOverlay, SlideMenu } from '../styles'
import LoggedOutMenu from './LoggedOutMenu'
import { AuthContext } from '../../../states/authState'
import LoggedInMenu from './LoggedInMenu'

interface UserMenuProps {
	closeMenu: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu }) => {
	const { isAuthenticated } = useContext(AuthContext)

	return (
		<>
			<SlideMenu transition={{ type: 'just' }} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
				{isAuthenticated && <LoggedInMenu closeMenu={closeMenu} />}
				{!isAuthenticated && <LoggedOutMenu closeMenu={closeMenu} />}
			</SlideMenu>
			<MenuOverlay
				onClick={closeMenu}
				transition={{ delay: 0.1 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
				exit={{ opacity: 0 }}
			></MenuOverlay>
		</>
	)
}

export default UserMenu
