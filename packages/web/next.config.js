const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
	pt: 'pt',
	en: 'en'
}

module.exports = {
	rewrites: async () => nextI18NextRewrites(localeSubpaths),
	publicRuntimeConfig: {
		localeSubpaths
	}
}
