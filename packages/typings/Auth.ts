import * as yup from 'yup'

export type AuthUser = {
	name: string
}

export type AuthPayload = {
	token: string
	user: AuthUser
}

export const LoginSchema = yup.object().shape({
	username: yup.string().required().min(3).max(24),
	password: yup.string().required().min(8).max(1000)
})

export type LoginPayload = yup.InferType<typeof LoginSchema>
