import styled from 'styled-components'
import { SaleWarningProps } from './index'

export const SSaleWarning = styled.div<Partial<SaleWarningProps>>`
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
