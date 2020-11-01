import { DefaultTheme } from 'styled-components'
type ExcludedProps = 'text' | 'background'

type PartialTheme<T> = {
	[K in keyof T]: Omit<T[K], ExcludedProps>
}

const fixedStyles: PartialTheme<DefaultTheme> = {
	title: '',

	colors: {
		primary: {
			100: '#1C013D',
			200: '#37017A',
			300: '#5302B8',
			400: '#6F02F5',
			500: '#9038FD',
			600: '#A660FD',
			700: '#BC88FE',
			800: '#D3AFFE',
			900: '#E9D7FF'
		},
		danger: {
			100: '#FD3838',
			200: '#FD1616',
			300: '#FD2727',
			400: '#FE7A7A',
			500: '#FEBDBD'
		}
	},

	fontSizes: {
		1: '5.4rem',
		2: '3.6rem',
		3: '2.8rem',
		4: '2.4rem',
		5: '1.8rem',
		6: '1.4rem',
		7: '1.2rem',
		8: '1.1rem',
		9: '1rem'
	},

	margins: {
		0: '0.5rem',
		1: '1rem',
		2: '2rem',
		3: '3rem',
		4: '4rem',
		5: '5rem',
		6: '6rem',
		7: '7rem',
		8: '8rem',
		9: '9rem',
		10: '10rem'
	},

	paddings: {
		0: '0.5rem',
		1: '1rem',
		2: '2rem',
		3: '3rem',
		4: '4rem',
		5: '5rem',
		6: '6rem',
		7: '7rem',
		8: '8rem',
		9: '9rem',
		10: '10rem'
	},

	borderRadius: {
		0: '0.5rem',
		1: '1rem',
		2: '2rem',
		3: '3rem',
		4: '4rem',
		5: '5rem',
		6: '6rem',
		7: '7rem',
		8: '8rem',
		9: '9rem',
		10: '10rem'
	},

	breakpoints: {
		sm: '450px',
		md: '768px',
		lg: '1150px',
		xl: '1440px'
	}
}

export default fixedStyles
