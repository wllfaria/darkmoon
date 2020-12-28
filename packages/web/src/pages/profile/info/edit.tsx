import { NextPage } from 'next'
import React, { useContext, useMemo, useRef, useState } from 'react'
import withPrivateRoute from '../../../components/PrivateRoute'
import ProfileLayout from '../../../components/ProfileLayout'
import { Form } from '@unform/web'
import Input from '../../../components/Input'
import { useTranslation } from '../../../../i18n'
import Button from '../../../components/Button'
import { ProfileSectionWrapper } from '../../../styles/GlobalComponents'
import { AuthContext } from '../../../states/authState'
import { UpdateUserInformationPayload, UpdateUserInformationSchema } from '../../../typings/Auth'
import { FormHandles } from '@unform/core'
import { ValidationError } from 'yup'
import mapYupErrors from '../../../utils/yupUtils'
import axios from '../../../services/axios'
import { HttpResponse } from '../../../typings/HttpResponse'
import { User } from '../../../typings/User'
import { useRouter } from 'next/router'
import Alert from '../../../components/Alert'

interface InfoEditPageProps {
	namespacesRequired: string[]
}

const InfoEditPage: NextPage<InfoEditPageProps> = () => {
	const [requestError, setRequestError] = useState('')
	const { user, updateUser } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const formRef = useRef<FormHandles>(null)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	const formInitialData: UpdateUserInformationPayload = useMemo(
		() => ({
			username: user?.username,
			cpf: user?.cpf
		}),
		[user]
	)

	const handleUpdateUser = async (data: UpdateUserInformationPayload) => {
		try {
			setLoading(true)
			await UpdateUserInformationSchema.validate(data, { abortEarly: false })
			const updateUserInformationPayload = UpdateUserInformationSchema.cast(data)
			const response = await axios.patch<HttpResponse<User>>('users/info', {
				...updateUserInformationPayload,
				email: user.email
			})
			updateUser(response.data.body)
			router.push(`/${i18n.language}/profile/info`)
		} catch (err) {
			if (err instanceof ValidationError) formRef.current.setErrors(mapYupErrors(err.inner))
			setRequestError('An error ocurred while processing your request, please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<ProfileLayout>
			<ProfileSectionWrapper>
				{requestError && <Alert message={requestError} variant="danger" />}
				<h3>{t('Information')}</h3>
			</ProfileSectionWrapper>
			<Form initialData={formInitialData} onSubmit={data => handleUpdateUser(data)} ref={formRef}>
				<fieldset disabled={loading}>
					<Input name="username" label={t('Name')} fullWidth />
					<Input name="cpf" label={t('CPF')} fullWidth />
				</fieldset>
				<Button loading={loading} type="submit" color="primary" size="large">
					{t('Save')}
				</Button>
			</Form>
		</ProfileLayout>
	)
}

InfoEditPage.getInitialProps = async (): Promise<InfoEditPageProps> => ({
	namespacesRequired: ['common']
})

export default withPrivateRoute(InfoEditPage)
