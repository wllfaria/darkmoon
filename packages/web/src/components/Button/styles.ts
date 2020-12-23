import styled from 'styled-components'

interface StyleButtonProps {
	isFullWidth: boolean
}

export const SButton = styled.button<StyleButtonProps>`
	border: none;
	outline: none;
	text-transform: uppercase;
	font-weight: bold;
	transition: background 150ms;
	border-radius: 3px;
	cursor: pointer;
	width: ${props => (props.isFullWidth ? '100%' : 'unset')};
	&.small {
		padding-right: ${props => props.theme.paddings[0]};
		padding-left: ${props => props.theme.paddings[0]};
		padding-top: ${props => props.theme.paddings[0]};
		padding-bottom: ${props => props.theme.paddings[0]};
		font-size: ${props => props.theme.fontSizes[7]};
	}
	&.medium {
		padding-right: ${props => props.theme.paddings[1]};
		padding-left: ${props => props.theme.paddings[1]};
		padding-top: ${props => props.theme.paddings[0]};
		padding-bottom: ${props => props.theme.paddings[0]};
		font-size: ${props => props.theme.fontSizes[6]};
	}
	&.large {
		padding-right: ${props => props.theme.paddings[2]};
		padding-left: ${props => props.theme.paddings[2]};
		padding-top: ${props => props.theme.paddings[0]};
		padding-bottom: ${props => props.theme.paddings[0]};
		font-size: ${props => props.theme.fontSizes[5]};

		@media (min-width: ${props => props.theme.breakpoints.lg}) {
			font-size: ${props => props.theme.fontSizes[4]};
		}
	}
	&.default {
		background: ${props => props.theme.colors.background[500]};
		color: ${props => props.theme.colors.text[100]};
		a {
			color: ${props => props.theme.colors.text[100]};
			text-decoration: none;
		}
		&:hover {
			background: ${props => props.theme.colors.background[400]};
		}
		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.background[300]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-decoration: none;
			}
			&:hover {
				background: ${props => props.theme.colors.background[500]};
			}
		}
		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-decoration: none;
			}
			&:hover {
				background: ${props => props.theme.colors.background[500]};
			}
		}
		&.light {
			color: ${props => props.theme.colors.text.white};
			a {
				color: ${props => props.theme.colors.text.white};
				text-decoration: none;
			}
		}
		&.dark {
			color: ${props => props.theme.colors.text[100]};
			a {
				color: ${props => props.theme.colors.text[100]};
				text-decoration: none;
			}
		}
	}
	&.primary {
		background: ${props => props.theme.colors.primary[500]};
		color: ${props => props.theme.colors.text.white};
		a {
			color: ${props => props.theme.colors.text.white};
			text-decoration: none;
		}
		&:hover {
			background: ${props => props.theme.colors.primary[600]};
		}
		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.primary[500]};
			background: none;
			&:hover {
				background: ${props => props.theme.colors.primary[500]};
				color: ${props => props.theme.colors.text.white};
			}
			a {
				color: ${props => props.theme.colors.text[100]};
				text-decoration: none;
			}
		}
		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-decoration: none;
			}
			&:hover {
				background: ${props => props.theme.colors.primary[800]};
			}
		}
		&.light {
			color: ${props => props.theme.colors.text.white};
			a {
				color: ${props => props.theme.colors.text.white};
				text-decoration: none;
			}
		}
		&.dark {
			color: ${props => props.theme.colors.text[100]};
			a {
				color: ${props => props.theme.colors.text[100]};
				text-decoration: none;
			}
		}
	}
	&.danger {
		background: ${props => props.theme.colors.danger[300]};
		color: ${props => props.theme.colors.text.white};
		a {
			color: ${props => props.theme.colors.text.white};
			text-transform: none;
		}
		&:hover {
			background: ${props => props.theme.colors.danger[400]};
		}
		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.danger[300]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-transform: none;
			}
			&:hover {
				background: ${props => props.theme.colors.danger[300]};
				color: ${props => props.theme.colors.text.white};
			}
		}
		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-transform: none;
			}
			&:hover {
				background: ${props => props.theme.colors.danger[500]};
			}
		}
		&.light {
			color: ${props => props.theme.colors.text.white};
			a {
				color: ${props => props.theme.colors.text.white};
				text-transform: none;
			}
		}
		&.dark {
			color: ${props => props.theme.colors.text[100]};
			a {
				color: ${props => props.theme.colors.text[100]};
				text-transform: none;
			}
		}
	}
	&.success {
		background: ${props => props.theme.colors.success[300]};
		color: ${props => props.theme.colors.text.white};
		a {
			color: ${props => props.theme.colors.text.white};
			text-transform: none;
		}
		&:hover {
			background: ${props => props.theme.colors.success[400]};
		}
		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.success[300]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-transform: none;
			}
			&:hover {
				background: ${props => props.theme.colors.success[300]};
				color: ${props => props.theme.colors.text.white};
			}
		}
		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;
			a {
				color: ${props => props.theme.colors.text[100]};
				text-transform: none;
			}
			&:hover {
				background: ${props => props.theme.colors.success[500]};
			}
		}
		&.light {
			color: ${props => props.theme.colors.text.white};
			a {
				color: ${props => props.theme.colors.text.white};
				text-transform: none;
			}
		}
		&.dark {
			color: ${props => props.theme.colors.text[100]};
			a {
				color: ${props => props.theme.colors.text[100]};
				text-transform: none;
			}
		}
	}
`
