import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { InputWrapper, InputLabel, AppInput, InvalidFeedback } from './styles'

interface InputProps {
	name: string
	label: string
	type?: string
	placeholder?: string
	fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({ name, type = 'text', label, fullWidth, placeholder }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value'
		})
	}, [fieldName, registerField])

	return (
		<InputWrapper>
			<InputLabel htmlFor={name}>{label}</InputLabel>
			<AppInput
				id={name}
				name={name}
				type={type}
				ref={inputRef}
				hasError={!!error}
				onFocus={clearError}
				isFullWidth={fullWidth}
				placeholder={placeholder}
				defaultValue={defaultValue}
			/>
			{error && <InvalidFeedback>{error}</InvalidFeedback>}
		</InputWrapper>
	)
}

export default Input
