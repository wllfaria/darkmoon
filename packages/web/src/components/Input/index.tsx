import React, { ChangeEvent, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { InputWrapper, InputLabel, AppInput, InvalidFeedback, LabelDescription } from './styles'

interface InputProps {
	name: string
	label: string
	type?: string
	labelDescription?: string
	placeholder?: string
	fullWidth?: boolean
	readOnly?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown
}

const Input: React.FC<InputProps> = ({
	name,
	type = 'text',
	label,
	fullWidth,
	readOnly,
	placeholder,
	onChange,
	labelDescription
}) => {
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
				readOnly={readOnly}
				onChange={onChange}
				onFocus={clearError}
				isFullWidth={fullWidth}
				placeholder={placeholder}
				defaultValue={defaultValue}
			/>
			{labelDescription && <LabelDescription>{labelDescription}</LabelDescription>}
			{error && <InvalidFeedback>{error}</InvalidFeedback>}
		</InputWrapper>
	)
}

export default Input
