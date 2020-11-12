import React from 'react'

import { SSaleWarning } from './styles'

export interface SaleWarningProps {
	backgroundColor?: string
	saleWarningText: string
}

const SaleWarning: React.FC<SaleWarningProps> = ({ saleWarningText }) => {
	return <SSaleWarning>{saleWarningText}</SSaleWarning>
}

export default SaleWarning
