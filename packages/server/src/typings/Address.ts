import * as yup from 'yup'

export interface Address {
	id: string
	addressName: string
	zipCode: string
	publicPlace: string
	complement: string
	neighborhood: string
	city: string
	state: string
	number: string
}

export const AddressSchema = yup
	.object()
	.shape({
		email: yup.string().email().required(),
		addressName: yup.string().min(3).max(30).required(),
		zipCode: yup.string().length(8).required(),
		number: yup.string().min(1).max(20).required(),
		publicPlace: yup.string().min(1).required(),
		neighborhood: yup.string().min(1).required(),
		city: yup.string().min(1).required(),
		state: yup.string().min(1).required(),
		complement: yup.string()
	})
	.strict(true)
	.required()
	.noUnknown()

export type AddressPayload = yup.InferType<typeof AddressSchema>

export const UpdateAddressesSchema = yup
	.object()
	.shape({
		email: yup.string().email().required(),
		addresses: yup.array(
			yup.object().shape({
				addressName: yup.string().min(3).max(30).required(),
				zipCode: yup.string().length(8).required(),
				number: yup.string().min(1).max(20).required(),
				publicPlace: yup.string().min(1).required(),
				neighborhood: yup.string().min(1).required(),
				city: yup.string().min(1).required(),
				state: yup.string().min(1).required(),
				complement: yup.string()
			})
		)
	})
	.strict(true)
	.required()
	.noUnknown()

export type UpdateAddressesPayload = yup.InferType<typeof UpdateAddressesSchema>

export const DeleteAddressSchema = yup
	.object()
	.shape({
		email: yup.string().email().required(),
		addressName: yup.string().min(1).required()
	})
	.strict(true)
	.required()
	.noUnknown()

export type DeleteAddressPayload = yup.InferType<typeof DeleteAddressSchema>
