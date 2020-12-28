import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { NextPage } from 'next'
import React, { useContext, useRef, useState } from 'react'
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
import axios from '../../../services/axios'
import withPrivateRoute from '../../../components/PrivateRoute'
import { useRouter } from 'next/router'
import Alert from '../../../components/Alert'

interface EditPasswordPageProps {
	namespacesRequired: string[]
}

const EditPasswordPage: NextPage<EditPasswordPageProps> = () => {
	const [requestError, setRequestError] = useState('')
	const [loading, setLoading] = useState(false)
	const formRef = useRef<FormHandles>(null)
	const { user } = useContext(AuthContext)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	const handleChangePassword = async (data: ChangePasswordPayload) => {
		try {
			setLoading(true)
			await ChangePasswordSchema.validate(data, { abortEarly: false })
			const changePasswordPayload = ChangePasswordSchema.cast(data)
			await axios.patch('users/password', { ...changePasswordPayload, email: user.email })
			router.push(`/${i18n.language}/profile/info`)
		} catch (err) {
			if (err instanceof ValidationError) formRef.current.setErrors(mapYupErrors(err.inner))
			setRequestError('Invalid password, please make sure you typed your old password correctly.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<ProfileLayout>
			<ProfileSectionWrapper>
				{!user?.image && user?.username && <CircularMonogram fullString={user.username} />}
				{user?.image && (
					<MenuUserImage
						src={user.image}
						alt={user.username || t('Profile picture')}
						title={user.username || t('Profile picture')}
					/>
				)}
			</ProfileSectionWrapper>
			<ProfileSectionWrapper>
				{requestError && <Alert message={t(requestError)} variant="danger" />}
				<h3>{t('Information')}</h3>
			</ProfileSectionWrapper>
			<ProfileSectionWrapper>
				<Form onSubmit={handleChangePassword} ref={formRef}>
					<fieldset disabled={loading}>
						<Input type="password" name="oldPassword" fullWidth label={t('Old password')} />
						<Input type="password" name="newPassword" fullWidth label={t('New password')} />
						<Input type="password" name="confirmation" fullWidth label={t('Confirm new password')} />
					</fieldset>
					<Button loading={loading} color="primary" size="large" type="submit">
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

export default withPrivateRoute(EditPasswordPage)
