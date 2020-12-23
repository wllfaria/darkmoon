import styled from 'styled-components'

export const LinkWrapper = styled.div`
	margin-bottom: ${props => props.theme.margins[1]};
`

export const MenuLink = styled.div`
	font-size: ${props => props.theme.fontSizes[5]};
	display: flex;
	align-items: center;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		font-size: ${props => props.theme.fontSizes[4]};
	}

	svg {
		min-width: 2rem;
	}

	a {
		margin-left: ${props => props.theme.margins[1]};
		text-decoration: none;
		color: ${props => props.theme.colors.text[100]};
	}
`

export const MenuUserImage = styled.img`
	width: 4rem;
	height: 4rem;
	border-radius: ${props => props.theme.borderRadius[4]};
	object-fit: cover;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		width: 6rem;
		height: 6rem;
		border-radius: ${props => props.theme.borderRadius[6]};
	}
`

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
`

export const MenuUserGreeting = styled.p`
	line-height: 1;
	font-size: ${props => props.theme.fontSizes[0]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		font-size: ${props => props.theme.fontSizes[5]};
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
