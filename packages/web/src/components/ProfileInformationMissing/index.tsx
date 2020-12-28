import React from 'react'
import { useTranslation } from '../../../i18n'

interface ProfileInformationMissingProps {
	informationName: string
}

const ProfileInformationMissing: React.FC<ProfileInformationMissingProps> = ({ informationName }) => {
	const { t } = useTranslation()

	return (
		<h6>
			{t('No')} {informationName} {t('registered')}
		</h6>
	)
}

export default ProfileInformationMissing
