import { DefaultTheme } from 'styled-components'
import FixedStyles from './fixedStyles'

const darkTheme: DefaultTheme = {
	title: 'Dark',

	colors: {
		primary: {
			...FixedStyles.colors.primary
		},
		background: {
			100: '#0E0E0E',
			200: '#1A1A1A',
			300: '#262626',
			400: '#323232',
			500: '#3E3E3E',
			accent: '#1A1A1A'
		},
		text: {
			100: '#F6F6F7',
			200: '#C2C2C9',
			300: '#8E8E9A',
			400: '#5D5D68',
			500: '#2E2E34',
			white: '#FFFFFF',
			black: '#242424'
		},
		danger: {
			...FixedStyles.colors.danger
		},
		success: {
			...FixedStyles.colors.success
		}
	},

	fontSizes: {
		...FixedStyles.fontSizes
	},

	margins: {
		...FixedStyles.margins
	},

	paddings: {
		...FixedStyles.paddings
	},

	borderRadius: {
		...FixedStyles.borderRadius
	},

	breakpoints: {
		...FixedStyles.breakpoints
	}
}

export default darkTheme
