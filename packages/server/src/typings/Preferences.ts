import * as yup from 'yup'

export interface Preferences {
	theme: 'Dark' | 'Light' | 'System'
}

export const UpdateThemeSchema = yup
	.object()
	.shape({
		email: yup.string().email().required(),
		theme: yup.string().min(1).required()
	})
	.strict(true)
	.required()
	.noUnknown()

export type UpdateThemePayload = yup.InferType<typeof UpdateThemeSchema>
