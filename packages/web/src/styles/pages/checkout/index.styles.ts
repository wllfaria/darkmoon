import styled from 'styled-components'

export const CheckoutWrapper = styled.div`
	margin-top: ${props => props.theme.margins[1]};
`

export const CheckoutList = styled.div`
	padding: ${props => props.theme.paddings[0]};
	background: ${props => props.theme.colors.background.accent};
	border: 1px solid ${props => props.theme.colors.background[500]};
	border-radius: ${props => props.theme.borderRadius[0]};
`

export const CheckoutListItem = styled.div`
	display: flex;
	justify-content: space-between;
`

export const OrderPrice = styled.div`
	text-align: right;
	display: flex;
	justify-content: space-between;
	font-size: ${props => props.theme.fontSizes[6]};
	margin-top: ${props => props.theme.margins[1]};
`
