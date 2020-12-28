import React from 'react'

import { SAlert } from './styles'

export type TAlertVariant = 'success' | 'danger'

interface AlertProps {
	message: string
	variant: TAlertVariant
}

const Alert: React.FC<AlertProps> = ({ message, variant }) => {
	return <SAlert className={variant}>{message}</SAlert>
}

export default Alert
