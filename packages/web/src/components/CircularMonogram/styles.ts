import styled from 'styled-components'

export const SCircularMonogram = styled.div`
	width: 4rem;
	height: 4rem;
	border-radius: ${props => props.theme.borderRadius[4]};
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => props.theme.colors.background[500]};
	font-size: ${props => props.theme.fontSizes[6]};
	font-weight: bold;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[4]};
		width: 6rem;
		height: 6rem;
		border-radius: ${props => props.theme.borderRadius[6]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[3]};
		width: 10rem;
		height: 10rem;
		border-radius: ${props => props.theme.borderRadius[10]};
	}
`
