import styled from 'styled-components'
import { motion } from 'framer-motion'

export const SHeader = styled.header`
	display: flex;
	justify-content: space-between;
	height: 5rem;
	align-items: center;
	padding: 0 ${props => props.theme.paddings[3]};
	background: ${props => props.theme.colors.background.accent};
`

export const LogoWrapper = styled.div`
	@media (min-width: ${props => props.theme.breakpoints.md}) {
		flex: 2;
	}

	a {
		text-decoration: none;
		color: ${props => props.theme.colors.text[100]};
		font-weight: bold;
		font-size: ${props => props.theme.fontSizes[4]};
	}
`

export const IconWrapper = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	font-size: ${props => props.theme.fontSizes[5]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		order: 1;

		&:not(:last-of-type) {
			margin-right: ${props => props.theme.margins[1]};
		}
	}
`

export const SlideMenu = styled(motion.div)`
	height: 100vh;
	width: 70vw;
	position: fixed;
	right: 0;
	top: 0;
	background: ${props => props.theme.colors.background.accent};
	z-index: 5;
	padding: ${props => props.theme.paddings[1]};

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		padding: ${props => props.theme.paddings[2]};
		width: 50vw;
	}
`

export const BackIconWrapper = styled.div`
	margin-bottom: ${props => props.theme.margins[1]};
`

export const BackIcon = styled.div`
	cursor: pointer;
	font-size: ${props => props.theme.fontSizes[4]};
`

export const MenuOverlay = styled(motion.div)`
	height: 100vh;
	width: 100vw;
	position: fixed;
	left: 0;
	top: 0;
	background: ${props => props.theme.colors.background.accent};
	z-index: 1;
`
