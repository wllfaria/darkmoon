import React from 'react'

import { SButton } from './styles'

type ButtonVariants = 'default' | 'text' | 'outlined'

type ButtonColors = 'default' | 'primary' | 'danger' | 'success'

type ButtonSizes = 'small' | 'medium' | 'large'

type ButtonTextColors = 'default' | 'light' | 'dark'

interface ButtonProps {
	variant?: ButtonVariants
	color?: ButtonColors
	disabled?: boolean
	size?: ButtonSizes
	textColor?: ButtonTextColors
}

const Button: React.FC<ButtonProps> = ({
	variant = 'default',
	size = 'medium',
	color = 'default',
	textColor = 'default',
	children
}) => {
	return <SButton className={`${variant} ${size} ${color} ${textColor}`}>{children}</SButton>
}

export default Button
