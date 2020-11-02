import React from 'react'
import styled from 'styled-components'

interface SaleWarningProps {
	className?: string
	backgroundColor?: string
	saleWarningText: string
}

const SaleWarning: React.FC<SaleWarningProps> = ({ className, saleWarningText }) => {
	return <div className={className}>{saleWarningText}</div>
}

export default styled(SaleWarning)`
	width: 100%;
	height: 20px;
	display: flex;
	justify-content: center;
	background: ${props => (props.backgroundColor ? props.backgroundColor : props.theme.colors.primary[500])};

	p {
		margin: 0;
		color: ${props => props.theme.colors.text[100]};
	}
`
