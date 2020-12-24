import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.main`
	padding: 0 1rem;

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		padding: 0 3rem;
	}

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		max-width: 1440px;
		margin: 0 auto;
	}
`

export const AuthWrapper = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		max-width: 500px;
		margin: 0 auto;
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		max-width: 600px;
		margin: 0 auto;
	}
`

export const AuthForm = styled(Form)`
	width: calc(100% - 2rem);
	background: ${props => props.theme.colors.background.accent};
	margin-top: ${props => props.theme.margins[3]};
	padding: ${props => props.theme.paddings[3]};
	border-radius: ${props => props.theme.borderRadius[0]};
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.19);
`

export const AuthHeading = styled.h2`
	font-size: ${props => props.theme.fontSizes[3]};
	margin-bottom: ${props => props.theme.margins[2]};

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[2]};
	}
`

export const LinkWrapper = styled.div`
	margin-bottom: ${props => props.theme.margins[1]};
`

interface MenuLinkProps {
	active?: boolean
}

export const MenuLink = styled.div<MenuLinkProps>`
	font-size: ${props => props.theme.fontSizes[5]};
	display: flex;
	align-items: center;
	color: ${props => (props.active ? props.theme.colors.primary[500] : props.theme.colors.text[100])};

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		font-size: ${props => props.theme.fontSizes[4]};
	}

	svg {
		min-width: 2rem;
	}

	a {
		margin-left: ${props => props.theme.margins[1]};
		text-decoration: none;
		color: ${props => (props.active ? props.theme.colors.primary[500] : props.theme.colors.text[100])};
		font-weight: ${props => (props.active ? 'bold' : 'normal')};
	}
`

export const MenuUserImage = styled.img`
	width: 4rem;
	height: 4rem;
	border-radius: ${props => props.theme.borderRadius[4]};
	object-fit: cover;
	margin-right: ${props => props.theme.margins[0]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		width: 6rem;
		height: 6rem;
		border-radius: ${props => props.theme.borderRadius[6]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		width: 10rem;
		height: 10rem;
		border-radius: ${props => props.theme.borderRadius[10]};
	}
`

export const ProfileSectionWrapper = styled.div`
	margin-bottom: ${props => props.theme.margins[2]};
`
