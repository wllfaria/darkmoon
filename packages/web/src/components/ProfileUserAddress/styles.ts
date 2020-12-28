import styled from 'styled-components'

export const ProfileAddressCardList = styled.ul`
	list-style: none;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: ${props => props.theme.margins[1]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: ${props => props.theme.margins[2]};
	}
`

export const ProfileAddressCard = styled.li`
	padding: ${props => props.theme.paddings[1]};
	border-radius: ${props => props.theme.borderRadius[0]};
	background: ${props => props.theme.colors.background.accent};
	border: 1px solid ${props => props.theme.colors.background[500]};
	margin-bottom: ${props => props.theme.margins[1]};

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		margin-bottom: ${props => props.theme.margins[2]};
	}

	a {
		text-decoration: none;
		color: ${props => props.theme.colors.primary[500]};
	}
`

export const ProfileAddressName = styled.h2`
	font-size: ${props => props.theme.fontSizes[5]};
	margin-bottom: ${props => props.theme.margins[1]};

	svg {
		color: ${props => props.theme.colors.primary[800]};
		margin-right: ${props => props.theme.margins[1]};
	}
`

export const ProfileAddressDetail = styled.p`
	font-size: ${props => props.theme.fontSizes[6]};
`
