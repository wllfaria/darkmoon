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

	body,
	textarea,
	input {
		font-family: 'Regular';
		line-height: 1.7555555555555556;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		-moz-font-smoothing: antialiased;
		text-rendering: optimizelegibility;

		@media (min-width: ${props => props.theme.breakpoints.lg}) {
			line-height: 2;
		}
	}
`
