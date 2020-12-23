import { FormHandles } from '@unform/core'
import { NextPage } from 'next'
import React, { useContext, useEffect, useRef } from 'react'
import { ValidationError } from 'yup'
import { useTranslation } from '../../i18n'
import Button from '../components/Button'
import Input from '../components/Input'
import { AuthForm, AuthHeading, AuthWrapper } from '../styles/GlobalComponents'
import { AuthPayload, LoginPayload, LoginSchema } from '../typings/Auth'
import mapYupErrors from '../utils/yupUtils'
import axios from '../services/axios'
import { AuthContext } from '../states/authState'
import { HttpResponse } from '../typings/HttpResponse'
import { useRouter } from 'next/router'

interface LoginPageProps {
	namespacesRequired: string[]
}

const LoginPage: NextPage<LoginPageProps> = () => {
	const { authenticate, isAuthenticated } = useContext(AuthContext)
	const formRef = useRef<FormHandles>(null)
	const { t, i18n } = useTranslation()
	const router = useRouter()

	useEffect(() => {
		isAuthenticated && router.replace(`/${i18n.language}`)
	}, [isAuthenticated, i18n.language, router])

	const handleLogin = async (data: LoginPayload) => {
		try {
			await LoginSchema.validate(data, { abortEarly: false })
			const loginData = LoginSchema.cast(data)
			const response = await axios.post<HttpResponse<AuthPayload>>('users/auth', loginData)
			authenticate(response.data.body)
		} catch (err) {
			if (err instanceof ValidationError) {
				formRef.current.setErrors(mapYupErrors(err.inner))
			}
		}
	}

	return (
		<AuthWrapper>
			<AuthForm ref={formRef} onSubmit={handleLogin}>
				<AuthHeading>{t('Login')}</AuthHeading>
				<Input type="email" label="Email" name="email" fullWidth />
				<Input type="password" label={t('Password')} name="password" fullWidth />
				<Button type="submit" fullWidth color="primary" size="large">
					{t('Login')}
				</Button>
			</AuthForm>
		</AuthWrapper>
	)
}

LoginPage.getInitialProps = async (): Promise<LoginPageProps> => ({
	namespacesRequired: ['common']
})

export default LoginPage
