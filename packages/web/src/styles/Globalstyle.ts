import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Red Hat Text', sans-serif;
	}

	::-webkit-scrollbar {
		width: 0.7rem;
		height: 0.7rem;

		&-thumb {
			background: ${props => props.theme.colors.primary[500]};
			&:hover {
				background: ${props => props.theme.colors.primary[700]};
			}

			&:active {
				background: ${props => props.theme.colors.primary[300]};
			}
		}

		&-track {
			background: ${props => props.theme.colors.background.accent};
		}
	}

	html {
		font-size: 10px;
	}

	body {
		background: ${props => props.theme.colors.background[100]};
		font-size: ${props => props.theme.fontSizes[8]};
		color: ${props => props.theme.colors.text[100]};
	}

	html,
	body {
		min-height: 100vh;
	}

	p {
		font-size: ${props => props.theme.fontSizes[0]};

		@media (min-width: ${props => props.theme.breakpoints.md}) {
			font-size: ${props => props.theme.fontSizes[6]};
		}

		@media (min-width: ${props => props.theme.breakpoints.lg}) {
			font-size: ${props => props.theme.fontSizes[5]};
		}
	}

	h1 {
		font-size: ${props => props.theme.fontSizes[1]};
	}

	h2 {
		font-size: ${props => props.theme.fontSizes[2]};
	}

	h3 {
		font-size: ${props => props.theme.fontSizes[3]};
	}

	h4 {
		font-size: ${props => props.theme.fontSizes[4]};
	}

	h5 {
		font-size: ${props => props.theme.fontSizes[5]};
	}

	h6 {
		font-size: ${props => props.theme.fontSizes[6]};
	}

	body,
	textarea,
	input {
		font-family: 'Red Hat Text';
		line-height: 1.7555555555555556;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		-moz-font-smoothing: antialiased;
		text-rendering: optimizelegibility;

		@media (min-width: ${props => props.theme.breakpoints.lg}) {
			line-height: 2;
		}
	}

	fieldset {
		border: none;
	}
`
