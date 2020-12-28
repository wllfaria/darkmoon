import * as yup from 'yup'
import { User } from './User'

export type AuthPayload = {
	token: string
	user: Partial<User>
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

export const ChangePasswordSchema = yup
	.object()
	.shape({
		email: yup.string().email().required(),
		oldPassword: yup.string().min(8).max(1000).required(),
		newPassword: yup.string().min(8).max(1000).required(),
		confirmation: yup
			.string()
			.oneOf([yup.ref('newPassword'), null], 'passwords must match')
			.required()
	})
	.strict(true)
	.required()
	.noUnknown()

export type ChangePasswordPayload = yup.InferType<typeof ChangePasswordSchema>

export const UpdateUserInformationSchema = yup.object().shape({
	email: yup.string().email().required(),
	username: yup.string().min(1).max(150),
	cpf: yup.string().length(11)
})

export type UpdateUserInformationPayload = yup.InferType<typeof UpdateUserInformationSchema>
