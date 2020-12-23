import React, { useCallback, useEffect, useState } from 'react'
import { SCircularMonogram } from './styles'

interface CircularMonogramProps {
	fullString: string
}

const CircularMonogram: React.FC<CircularMonogramProps> = ({ fullString }) => {
	const [monogram, setMonogram] = useState('')

	const createMonogram = useCallback((fullString: string) => {
		const createdMonogram = fullString.split(' ').reduce((firstLetters, curr, i, { length }) => {
			if (i === 0 || i === length - 1) firstLetters += curr[0].toUpperCase()
			return firstLetters
		}, '')
		setMonogram(createdMonogram)
	}, [])

	useEffect(() => {
		createMonogram(fullString)
	}, [fullString, createMonogram])

	return <SCircularMonogram>{monogram}</SCircularMonogram>
}

export default CircularMonogram
