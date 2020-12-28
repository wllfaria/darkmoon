import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '../../../i18n'
import { AuthContext } from '../../states/authState'
import { ProfileSectionWrapper } from '../../styles/GlobalComponents'
import ProfileInformationMissing from '../ProfileInformationMissing'
import TitleWithButton from '../TitleWithButton'
import { ProfileAddressCard, ProfileAddressCardList, ProfileAddressDetail, ProfileAddressName } from './styles'

interface ProfileUserAddressProps {
	buttonText: string
	pageLink: string
}

const ProfileUserAddress: React.FC<ProfileUserAddressProps> = ({ buttonText, pageLink }) => {
	const { user } = useContext(AuthContext)
	const { t, i18n } = useTranslation()

	return (
		<ProfileSectionWrapper>
			<TitleWithButton title={t('Addresses')} buttonStyling={{ type: 'button', variant: 'outlined', size: 'small' }}>
				<Link href={`/${i18n.language}/${pageLink}`}>{t(buttonText)}</Link>
			</TitleWithButton>
			{!user?.addresses?.length && <ProfileInformationMissing informationName={t('address')} />}
			{user?.addresses?.length && (
				<ProfileAddressCardList>
					{user?.addresses?.map(address => (
						<ProfileAddressCard key={address.id}>
							<ProfileAddressName>
								<FontAwesomeIcon icon={['fas', 'bookmark']} />
								<Link href={`/${i18n.language}/profile/addresses/${address.addressName}`}>{address.addressName}</Link>
							</ProfileAddressName>
							<ProfileAddressDetail>
								{address.publicPlace}, {address.number} - {address.zipCode} - {address.city}/{address.state}
							</ProfileAddressDetail>
						</ProfileAddressCard>
					))}
				</ProfileAddressCardList>
			)}
		</ProfileSectionWrapper>
	)
}

export default ProfileUserAddress
