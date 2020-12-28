import React, { useEffect } from 'react'
import { useField } from '@unform/core'

interface RadioInputProps {
	id?: string
	name: string
	value: string
	index: number
	refs: React.MutableRefObject<HTMLInputElement[]>
}

const RadioInput: React.FC<RadioInputProps> = ({ name, id, index, value, refs }) => {
	const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: refs.current,
			getValue: (refs: HTMLInputElement[]) => {
				return refs.filter(ref => ref.checked).map(ref => ref.value)
			}
		})
	}, [fieldName, registerField, refs])

	return (
		<>
			<input
				name={name}
				type="radio"
				value={value}
				id={id || name}
				onFocus={clearError}
				defaultValue={defaultValue}
				ref={ref => (refs.current[index] = ref as HTMLInputElement)}
			/>
		</>
	)
}

export default RadioInput
