import styled from 'styled-components'

export const SProfileLayout = styled.div`
	padding-top: ${props => props.theme.paddings[1]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		padding-top: ${props => props.theme.paddings[3]};
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-areas: 'menu menu menu menu content content content content content content content content';

		div:first-of-type {
			grid-area: menu;
		}

		div:last-of-type {
			grid-area: content;
		}
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		grid-template-areas: 'menu menu menu content content content content content content content content content';
	}

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		grid-template-areas: 'menu menu menu content content content content content content content content content';
	}
`
