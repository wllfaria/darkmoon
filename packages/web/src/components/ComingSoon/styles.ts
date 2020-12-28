import styled from 'styled-components'

export const FullscreenCenter = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const ComingSoonMessage = styled.p`
	font-size: ${props => props.theme.fontSizes[2]};
	font-weight: bold;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		font-size: ${props => props.theme.fontSizes[1]};
	}
`
