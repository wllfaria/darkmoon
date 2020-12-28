import React from 'react'
import { useTranslation } from '../../../i18n'
import { ComingSoonMessage, FullscreenCenter } from './styles'

const ComingSoon: React.FC = () => {
	const { t } = useTranslation()

	return (
		<FullscreenCenter>
			<ComingSoonMessage>{t('Coming soon')}</ComingSoonMessage>
		</FullscreenCenter>
	)
}

export default ComingSoon
