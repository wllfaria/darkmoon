import 'styled-components'

declare module '*.json' {
	const value: unknown
	export default value
}

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string

		colors: {
			/**
			 * @description Each Property number changes the tint of the primary color to a lighter or darker version,
			 * Our primary color is purple and the default is 500, going up turns the
			 * purple light, going down turns the purple darker.
			 * @property {string} 100 - The Darkest Primary color
			 * @property {string} 500 - The Default Primary color
			 * @property {string} 900 - The Lightest Primary color
			 */
			primary: {
				100: string
				200: string
				300: string
				400: string
				500: string
				600: string
				700: string
				800: string
				900: string
			}
			/**
			 * @description Each Property number changes the tint of the background to a lighter or darker color
			 * @property {string} 100 - The Default app background
			 * @property {string} 200 - The first accent color for the background
			 * @property {string} 300 - The second accent color for the background
			 * @property {string} 400 - The third accent color for the background
			 * @property {string} 500 - The fourth accent color for the background
			 * @property {string} accent - The default accent color for the background
			 */
			background: {
				100: string
				200: string
				300: string
				400: string
				500: string
				accent: string
			}

			/**
			 * @description Each Property number changes the tint of the text to a lighter or darker color
			 * @property {string} 100 - The Default app text
			 * @property {string} 200 - The first accent color for the text
			 * @property {string} 300 - The second accent color for the text
			 * @property {string} 400 - The third accent color for the text
			 * @property {string} 500 - The fourth accent color for the text
			 * @property {string} white - This is a pure white text, used when the color should stay the same white.
			 */
			text: {
				100: string
				200: string
				300: string
				400: string
				500: string
				white: string
			}

			/**
			 * @description Each Property number changes the tint of the danger color to a lighter or darker color
			 * @property {string} 100 - The Default app danger color
			 * @property {string} 200 - The first accent color for danger
			 * @property {string} 300 - The second accent color for danger
			 * @property {string} 400 - The third accent color for danger
			 * @property {string} 500 - The fourth accent color for danger
			 */
			danger: {
				100: string
				200: string
				300: string
				400: string
				500: string
			}
		}

		/**
		 * @description Our base font size is 10px and the number for that is 8. going down in numbers increase the font size.
		 * @property {string} 1 - The biggest font size
		 * @property {string} 8 - the base font size
		 */
		fontSizes: {
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
		}

		/**
		 * @description our base margin is 10px, however, the 0 is equivalent of 5px (half). going up increases the margin size.
		 * @property {string} 0 - The smallest margin size
		 * @property {string} 1 - The default margin size
		 * @property {string} 10 - the biggest margin size
		 */
		margins: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
		}

		/**
		 * @description our base padding is 10px, however, the 0 is equivalent of 5px (half). going up increases the margin size.
		 * @property {string} 0 - The smallest padding size
		 * @property {string} 1 - The default padding size
		 * @property {string} 10 - the biggest padding size
		 */
		paddings: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
		}

		/**
		 * @description our base border radius is 10px, however, the 0 is equivalent of 5px (half). going up increases the margin size.
		 * @property {string} 0 - The smallest border radius size
		 * @property {string} 1 - The default border radius size
		 * @property {string} 10 - the biggest border radius size
		 */
		borderRadius: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
		}

		breakpoints: {
			sm: string
			md: string
			lg: string
			xl: string
		}
	}
}
