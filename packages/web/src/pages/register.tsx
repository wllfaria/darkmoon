import { FormHandles } from '@unform/core'
import { NextPage } from 'next'
import React, { useContext, useEffect, useRef } from 'react'
import { ValidationError } from 'yup'
import { useTranslation } from '../../i18n'
import Button from '../components/Button'
import Input from '../components/Input'
import { AuthForm, AuthHeading, AuthWrapper } from '../styles/GlobalComponents'
import { AuthPayload, RegisterPayload, RegisterSchema } from '../typings/Auth'
import mapYupErrors from '../utils/yupUtils'
import axios from '../services/axios'
import { AuthContext } from '../states/authState'
import { HttpResponse } from '../typings/HttpResponse'
import { useRouter } from 'next/router'

interface RegisterPageProps {
	namespacesRequired: string[]
}

const RegisterPage: NextPage<RegisterPageProps> = () => {
	const { authenticate, isAuthenticated } = useContext(AuthContext)
	const formRef = useRef<FormHandles>(null)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	useEffect(() => {
		isAuthenticated && router.replace(`/${i18n.language}`)
	}, [isAuthenticated, i18n.language, router])

	const handleRegister = async (data: RegisterPayload) => {
		try {
			await RegisterSchema.validate(data, { abortEarly: false })
			const registerData = RegisterSchema.cast(data)
			const response = await axios.post<HttpResponse<AuthPayload>>('users/register', registerData)
			authenticate(response.data.body)
		} catch (err) {
			if (err instanceof ValidationError) {
				formRef.current.setErrors(mapYupErrors(err.inner))
			}
		}
	}

	return (
		<AuthWrapper>
			<AuthForm ref={formRef} onSubmit={handleRegister}>
				<AuthHeading>{t('Sign up')}</AuthHeading>
				<Input type="email" label="Email" name="email" fullWidth />
				<Input type="password" label={t('Password')} name="password" fullWidth />
				<Input type="password" label={t('Password confirmation')} name="confirmation" fullWidth />
				<Button type="submit" fullWidth color="primary" size="large">
					{t('Sign up')}
				</Button>
			</AuthForm>
		</AuthWrapper>
	)
}

RegisterPage.getInitialProps = async (): Promise<RegisterPageProps> => ({
	namespacesRequired: ['common']
})

export default RegisterPage
