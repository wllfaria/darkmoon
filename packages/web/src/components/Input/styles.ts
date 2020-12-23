import styled from 'styled-components'

interface IStyleInputProps {
	hasError: boolean
	isFullWidth: boolean
}

export const InputWrapper = styled.div`
	margin-bottom: ${props => props.theme.margins[1]};
`

export const InputLabel = styled.label`
	display: block;
	font-weight: bold;
	line-height: 1;
	margin-bottom: ${props => props.theme.margins[1]};
	font-size: ${props => props.theme.fontSizes[5]};

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[3]};
	}
`

export const AppInput = styled.input<IStyleInputProps>`
	border-width: 0.2rem;
	border-style: solid;
	border-radius: ${props => props.theme.borderRadius[0]};
	border-color: ${props => (props.hasError ? props.theme.colors.danger[300] : props.theme.colors.background[500])};
	width: ${props => (props.isFullWidth ? '100%' : '200px')};
	padding: ${props => props.theme.paddings[0]} ${props => props.theme.paddings[1]};
	font-size: ${props => props.theme.fontSizes[5]};
	font-weight: bold;
	margin-bottom: ${props => props.theme.margins[0]};
	background: ${props => props.theme.colors.background.accent};
	color: ${props => props.theme.colors.text[100]};

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		font-size: ${props => props.theme.fontSizes[4]};
		padding: ${props => props.theme.paddings[0]} ${props => props.theme.paddings[2]};
	}

	&:hover {
		border-color: ${props => props.theme.colors.primary[700]};
	}

	&:focus {
		outline: none;
		background: ${props => props.theme.colors.background[100]};
		border-color: ${props => props.theme.colors.primary[500]};
	}
`

export const InvalidFeedback = styled.span`
	color: ${props => props.theme.colors.danger[300]};
	font-size: ${props => props.theme.fontSizes[5]};
	line-height: 1;
`
