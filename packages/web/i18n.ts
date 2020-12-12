import NextI18Next from 'next-i18next'
import { publicRuntimeConfig } from './next.config'
const { localeSubpaths } = publicRuntimeConfig

const NextI18NextInstance = new NextI18Next({
	otherLanguages: ['pt', 'en'],
	defaultLanguage: 'pt',
	localeSubpaths,
	localePath: 'public/static/locales'
})

export const { appWithTranslation, useTranslation } = NextI18NextInstance

export default NextI18NextInstance
