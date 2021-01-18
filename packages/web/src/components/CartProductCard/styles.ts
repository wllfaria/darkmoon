import styled, { css } from 'styled-components'

interface ProductCardProps {
	isRemoving: boolean
}

export const SCartProductCard = styled.li<ProductCardProps>`
	padding: ${props => props.theme.paddings[0]};
	border-radius: ${props => props.theme.borderRadius[0]};
	${props => {
		if (props.isRemoving) {
			return css`
				background: ${props => props.theme.colors.danger[500]};
				border: 1px dashed ${props => props.theme.colors.danger[400]};
			`
		}
		return css`
			background: ${props => props.theme.colors.background.accent};
			border: 1px solid ${props => props.theme.colors.background[500]};
		`
	}}
	margin-bottom: ${props => props.theme.margins[1]};
	position: relative;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		padding: ${props => props.theme.paddings[1]};
	}
`

export const RemoveProduct = styled.div<ProductCardProps>`
	font-size: ${props => props.theme.fontSizes[6]};
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		right: 1rem;
		top: 1rem;
	}

	${props => {
		if (props.isRemoving) {
			return css`
				button div {
					color: ${props => props.theme.colors.danger[200]};
				}
			`
		}
	}}
`

export const ProductCardHeader = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		flex-direction: row;
	}
`

export const ProductCardImg = styled.img`
	width: 5rem;
	height: 5rem;
	object-fit: cover;
	object-position: top;
	border-radius: ${props => props.theme.borderRadius[5]};
	margin-right: ${props => props.theme.margins[1]};
	margin-bottom: ${props => props.theme.margins[1]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		width: 10rem;
		height: 10rem;
		border-radius: ${props => props.theme.borderRadius[5]};
		margin-bottom: 0;
		cursor: pointer;
	}
`

export const ProductCardDetails = styled.div`
	display: flex;
	flex: 1;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		display: block;
	}
`

export const ProductName = styled.h3`
	font-size: ${props => props.theme.fontSizes[5]};
	margin-bottom: ${props => props.theme.margins[0]};
	font-weight: bold;
	cursor: pointer;
	line-height: 1;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[4]};
	}
`

export const ProductInfo = styled.p`
	font-size: ${props => props.theme.fontSizes[6]};
	margin-right: ${props => props.theme.margins[1]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[5]};
	}
`
