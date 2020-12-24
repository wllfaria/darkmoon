import React from 'react'
import Button, { ButtonProps } from '../Button'
import { STitleWithButton } from './styles'

interface TitleWithButtonProps {
	title: string
	buttonStyling: ButtonProps
}

const TitleWithButton: React.FC<TitleWithButtonProps> = ({ children, title, buttonStyling }) => {
	return (
		<STitleWithButton>
			<h3>{title}</h3>
			<div>
				<Button {...buttonStyling}>{children}</Button>
			</div>
		</STitleWithButton>
	)
}

export default TitleWithButton
