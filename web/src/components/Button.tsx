import React from 'react'
import styled from 'styled-components'

type ButtonVariants = 'default' | 'text' | 'outlined'

type ButtonColors = 'default' | 'primary' | 'danger' | 'success'

type ButtonSizes = 'small' | 'medium' | 'large'

type ButtonTextColors = 'default' | 'light' | 'dark'

interface ButtonProps {
	className?: string
	variant?: ButtonVariants
	color?: ButtonColors
	disabled?: boolean
	size?: ButtonSizes
	textColor?: ButtonTextColors
}

const Button: React.FC<ButtonProps> = ({
	className,
	variant = 'default',
	size = 'medium',
	color = 'default',
	textColor = 'default',
	children
}) => {
	return <button className={`${variant} ${size} ${color} ${textColor} ${className}`}>{children}</button>
}

export default styled(Button)`
	border: none;
	outline: none;
	text-transform: uppercase;
	font-weight: bold;
	transition: background 150ms;
	border-radius: 3px;
	cursor: pointer;

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
	}

	&.default {
		background: ${props => props.theme.colors.background[500]};
		color: ${props => props.theme.colors.text[100]};

		&:hover {
			background: ${props => props.theme.colors.background[400]};
		}

		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.background[300]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.background[500]};
			}
		}

		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.background[500]};
			}
		}

		&.light {
			color: ${props => props.theme.colors.text.white};
		}

		&.dark {
			color: ${props => props.theme.colors.text[100]};
		}
	}

	&.primary {
		background: ${props => props.theme.colors.primary[500]};
		color: ${props => props.theme.colors.text.white};

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
		}

		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.primary[800]};
			}
		}

		&.light {
			color: ${props => props.theme.colors.text.white};
		}

		&.dark {
			color: ${props => props.theme.colors.text[100]};
		}
	}

	&.danger {
		background: ${props => props.theme.colors.danger[300]};
		color: ${props => props.theme.colors.text.white};

		&:hover {
			background: ${props => props.theme.colors.danger[400]};
		}

		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.danger[300]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.danger[300]};
				color: ${props => props.theme.colors.text.white};
			}
		}

		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.danger[500]};
			}
		}

		&.light {
			color: ${props => props.theme.colors.text.white};
		}

		&.dark {
			color: ${props => props.theme.colors.text[100]};
		}
	}

	&.success {
		background: ${props => props.theme.colors.success[300]};
		color: ${props => props.theme.colors.text.white};

		&:hover {
			background: ${props => props.theme.colors.success[400]};
		}

		&.outlined {
			color: ${props => props.theme.colors.text[100]};
			border: 2px solid ${props => props.theme.colors.success[300]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.success[300]};
				color: ${props => props.theme.colors.text.white};
			}
		}

		&.text {
			color: ${props => props.theme.colors.text[100]};
			background: none;

			&:hover {
				background: ${props => props.theme.colors.success[500]};
			}
		}

		&.light {
			color: ${props => props.theme.colors.text.white};
		}

		&.dark {
			color: ${props => props.theme.colors.text[100]};
		}
	}
`
