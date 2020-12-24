import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { NextPage } from 'next'
import React, { useContext, useRef } from 'react'
import { ValidationError } from 'yup'
import { useTranslation } from '../../../../i18n'
import Button from '../../../components/Button'
import CircularMonogram from '../../../components/CircularMonogram'
import Input from '../../../components/Input'
import ProfileLayout from '../../../components/ProfileLayout'
import { AuthContext } from '../../../states/authState'
import { MenuUserImage, ProfileSectionWrapper } from '../../../styles/GlobalComponents'
import { ChangePasswordPayload, ChangePasswordSchema } from '../../../typings/Auth'
import mapYupErrors from '../../../utils/yupUtils'

interface EditPasswordPageProps {
	namespacesRequired: string[]
}

const EditPasswordPage: NextPage<EditPasswordPageProps> = () => {
	const formRef = useRef<FormHandles>(null)
	const { user } = useContext(AuthContext)
	const { t } = useTranslation()

	const handleChangePassword = async (data: ChangePasswordPayload) => {
		try {
			await ChangePasswordSchema.validate(data, { abortEarly: false })
			const changePasswordPayload = ChangePasswordSchema.cast(data)
			console.log(changePasswordPayload)
		} catch (err) {
			if (err instanceof ValidationError) formRef.current.setErrors(mapYupErrors(err.inner))
		}
	}

	return (
		<ProfileLayout>
			<ProfileSectionWrapper>
				{!user?.image && user?.name && <CircularMonogram fullString={user.name} />}
				{user?.image && (
					<MenuUserImage
						src={user.image}
						alt={user.name || t('Profile picture')}
						title={user.name || t('Profile picture')}
					/>
				)}
			</ProfileSectionWrapper>
			<ProfileSectionWrapper>
				<h3>{t('Information')}</h3>
			</ProfileSectionWrapper>
			<ProfileSectionWrapper>
				<Form onSubmit={handleChangePassword} ref={formRef}>
					<Input type="password" name="oldPassword" fullWidth label={t('Old password')} />
					<Input type="password" name="newPassword" fullWidth label={t('New password')} />
					<Input type="password" name="confirmation" fullWidth label={t('Confirm new password')} />
					<Button color="primary" size="large" type="submit">
						{t('Save')}
					</Button>
				</Form>
			</ProfileSectionWrapper>
		</ProfileLayout>
	)
}

EditPasswordPage.getInitialProps = async (): Promise<EditPasswordPageProps> => ({
	namespacesRequired: ['common']
})

export default EditPasswordPage
