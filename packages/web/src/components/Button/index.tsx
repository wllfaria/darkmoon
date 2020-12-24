import React from 'react'

import { SButton } from './styles'

type ButtonVariants = 'default' | 'text' | 'outlined'

type ButtonColors = 'default' | 'primary' | 'danger' | 'success'

type ButtonSizes = 'small' | 'medium' | 'large'

type ButtonTextColors = 'default' | 'light' | 'dark'

type TButtonTypes = 'button' | 'submit' | 'reset'

export interface ButtonProps {
	variant?: ButtonVariants
	color?: ButtonColors
	disabled?: boolean
	size?: ButtonSizes
	textColor?: ButtonTextColors
	fullWidth?: boolean
	type: TButtonTypes
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
	variant = 'default',
	size = 'medium',
	color = 'default',
	textColor = 'default',
	fullWidth = false,
	type = 'button',
	onClick,
	children
}) => {
	return (
		<SButton
			onClick={onClick}
			type={type}
			isFullWidth={fullWidth}
			className={`${variant} ${size} ${color} ${textColor}`}
		>
			{children}
		</SButton>
	)
}

export default Button
