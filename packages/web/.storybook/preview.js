import { addDecorator } from '@storybook/react'
import { themes } from '@storybook/theming'

import AppThemeState from '../src/states/appThemeState'

addDecorator(storyFn => <AppThemeState>{storyFn()}</AppThemeState>)

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	docs: {
		theme: themes.dark
  }
}
