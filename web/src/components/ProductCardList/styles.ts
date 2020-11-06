import styled from 'styled-components'

export const SProductCardList = styled.div`
	.product-card__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: ${props => props.theme.margins[1]};
		grid-row-gap: ${props => props.theme.margins[1]};

		@media (min-width: ${props => props.theme.breakpoints.sm}) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (min-width: ${props => props.theme.breakpoints.md}) {
			grid-template-columns: repeat(4, 1fr);
		}

		@media (min-width: ${props => props.theme.breakpoints.lg}) {
			grid-template-columns: repeat(5, 1fr);
		}

		@media (min-width: ${props => props.theme.breakpoints.xl}) {
			grid-template-columns: repeat(6, 1fr);
		}
	}
`
