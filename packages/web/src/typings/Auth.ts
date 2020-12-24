import * as yup from 'yup'
import { User } from './User'

export type AuthPayload = {
	token: string
	user: User
}

export const LoginSchema = yup
	.object()
	.shape({
		password: yup.string().min(8).max(1000).required(),
		email: yup.string().email().required()
	})
	.strict(true)
	.required()
	.noUnknown()

export type LoginPayload = yup.InferType<typeof LoginSchema>

export const RegisterSchema = yup
	.object()
	.shape({
		password: yup.string().min(8).max(1000).required(),
		confirmation: yup
			.string()
			.oneOf([yup.ref('password'), null], 'passwords must match')
			.required(),
		email: yup.string().email().required()
	})
	.strict(true)
	.required()
	.noUnknown()

export type RegisterPayload = yup.InferType<typeof RegisterSchema>

export const ChangePasswordSchema = yup.object().shape({
	oldPassword: yup.string().min(8).max(1000).required(),
	newPassword: yup.string().min(8).max(1000).required(),
	confirmation: yup
		.string()
		.oneOf([yup.ref('newPassword'), null], 'passwords must match')
		.required()
})

export type ChangePasswordPayload = yup.InferType<typeof ChangePasswordSchema>
