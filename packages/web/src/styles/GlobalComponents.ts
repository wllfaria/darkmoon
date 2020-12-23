import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.main`
	padding: 0 1rem;
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
