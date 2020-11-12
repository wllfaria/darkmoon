import { DefaultTheme } from 'styled-components'
import FixedStyles from './fixedStyles'

const lightTheme: DefaultTheme = {
	title: 'Light',

	colors: {
		primary: {
			...FixedStyles.colors.primary
		},
		background: {
			100: '#F6F6F7',
			200: '#696969',
			300: '#8D8D8D',
			400: '#B0B0B0',
			500: '#D3D3D3',
			accent: '#FFFFFF'
		},
		text: {
			100: '#0E0E0E',
			200: '#3E3E3E',
			300: '#6E6E6E',
			400: '#9F9F9F',
			500: '#CFCFCF',
			white: '#FFFFFF'
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

export default lightTheme
