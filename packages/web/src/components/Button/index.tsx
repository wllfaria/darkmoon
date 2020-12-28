import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { SButton } from './styles'

type ButtonVariants = 'default' | 'text' | 'outlined'

type ButtonColors = 'default' | 'primary' | 'danger' | 'success'

type ButtonSizes = 'small' | 'medium' | 'large'

type ButtonTextColors = 'default' | 'light' | 'dark'

type TButtonTypes = 'button' | 'submit' | 'reset'

export interface ButtonProps {
	textColor?: ButtonTextColors
	variant?: ButtonVariants
	color?: ButtonColors
	onClick?: () => void
	fullWidth?: boolean
	disabled?: boolean
	size?: ButtonSizes
	type: TButtonTypes
	loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
	textColor = 'default',
	variant = 'default',
	color = 'default',
	fullWidth = false,
	size = 'medium',
	type = 'button',
	children,
	onClick,
	loading
}) => {
	return (
		<SButton
			onClick={onClick}
			type={type}
			isFullWidth={fullWidth}
			className={`${variant} ${size} ${color} ${textColor}`}
		>
			{!loading && children}
			{loading && <FontAwesomeIcon icon={['fas', 'spinner']} spin />}
		</SButton>
	)
}

export default Button
