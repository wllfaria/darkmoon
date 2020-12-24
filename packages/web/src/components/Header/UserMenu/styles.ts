import styled from 'styled-components'

export const MenuUserInfo = styled.div`
	display: flex;
	margin-bottom: ${props => props.theme.margins[2]};

	div:first-of-type {
		margin-right: ${props => props.theme.margins[0]};
	}
`

export const MenuUserContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		justify-content: unset;
	}
`

export const MenuUserGreeting = styled.p`
	line-height: 1;
	font-size: ${props => props.theme.fontSizes[0]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[5]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		margin-bottom: ${props => props.theme.margins[1]};
	}
`

export const MenuUserName = styled.p`
	font-size: ${props => props.theme.fontSizes[5]};
	font-weight: bold;
	line-height: 1;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[3]};
	}
`
