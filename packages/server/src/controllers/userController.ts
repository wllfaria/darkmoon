import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { UpdateUserInformationSchema } from '../typings/Auth'
import { PrivateLambda } from '../utils/authUtils'
import { parseBody } from '../utils/lambdaUtils'
import userModel from '../models/userModel'
import { ValidationError } from 'yup'
import { BadRequest, Created, InternalServerError, OK, ResourceUpdated } from '../utils/lambdaWrapper'
import mapYupErrors from '../utils/yupUtils'
import { AddressSchema, DeleteAddressSchema, UpdateAddressesSchema } from '../typings/Address'
import { UpdateThemeSchema } from '../typings/Preferences'

class UserController {
	@PrivateLambda()
	public async updateInformation(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await UpdateUserInformationSchema.validate(body, { abortEarly: false })
			const shapedBody = UpdateUserInformationSchema.cast(body)

			const payload = await userModel.updateInformation(shapedBody)
			return OK(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}

	@PrivateLambda()
	public async createAddress(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await AddressSchema.validate(body, { abortEarly: false })
			const shapedBody = AddressSchema.cast(body)

			const payload = await userModel.createAddress(shapedBody)
			return Created(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}

	@PrivateLambda()
	public async updateAddresses(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await UpdateAddressesSchema.validate(body, { abortEarly: false })
			const shapedBody = UpdateAddressesSchema.cast(body)

			const payload = await userModel.updateAddresses(shapedBody)
			return OK(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}

	@PrivateLambda()
	public async updateThemePreference(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await UpdateThemeSchema.validate(body, { abortEarly: false })
			const shapedBody = UpdateThemeSchema.cast(body)

			const payload = await userModel.updateThemePreference(shapedBody)
			return OK(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}

	@PrivateLambda()
	public async deleteAddress(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await DeleteAddressSchema.validate(body, { abortEarly: false })
			const shapedBody = DeleteAddressSchema.cast(body)

			const payload = await userModel.deleteAddress(shapedBody)
			return OK(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}
}

export default new UserController()
