import styled from 'styled-components'

export const SCartMenu = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 3rem;
`

export const CartHeader = styled.h2`
	font-size: ${props => props.theme.fontSizes[4]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[3]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[2]};
	}
`

export const CartItems = styled.ul`
	list-style: none;
`
