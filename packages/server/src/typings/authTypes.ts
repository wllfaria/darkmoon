import * as yup from 'yup'

export type AuthUser = {
	name: string
}

export type AuthPayload = {
	token: string
	user?: AuthUser
}

export type LoginPayload = {
	username: string
	password: string
}

export const LoginSchema = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required()
})
