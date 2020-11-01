import React from 'react'
import styled from 'styled-components'
import { useGetRequest } from '../hooks/useGetRequest'

interface SaleWarningProps {
	className?: string
}

interface SaleWarningData {
	saleText: string
}

const SaleWarning: React.FC<SaleWarningProps> = ({ className }) => {
	const { data } = useGetRequest<SaleWarningData>('PLACEHOLDER')

	return <div className={className}>{data?.saleText}</div>
}

export default styled(SaleWarning)`
	width: 100%;
	height: 20px;
	display: flex;
	justify-content: center;
	background: ${props => props.theme.colors.primary[500]};

	p {
		margin: 0;
	}
`
