import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import authModel from '../models/authModel'
import { LoginSchema, RegisterSchema } from '../typings/Auth'
import mapYupErrors from '../utils/yupUtils'
import { checkToken, extractTokenFromHeaders } from '../utils/authUtils'
import { parseBody } from '../utils/lambdaUtils'
import { BadRequest, Created, InternalServerError, OK } from '../utils/lambdaWrapper'
import { ValidationError } from 'yup'

class AuthController {
	public verify(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const token = extractTokenFromHeaders(event)
			const decoded = checkToken(token)

			if (!decoded || !token) return BadRequest({ message: 'Invalid or missing token' })

			return OK({ token: decoded })
		} catch (err) {
			return InternalServerError({ message: err.message })
		}
	}

	public async authenticate(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await LoginSchema.validate(body, { abortEarly: false })

			const shapedBody = LoginSchema.cast(body)
			const payload = await authModel.authenticate(shapedBody)

			return OK(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}

	public async register(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			await RegisterSchema.validate(body, { abortEarly: false })

			const shapedBody = RegisterSchema.cast(body)

			const payload = await authModel.register(shapedBody)
			return Created(payload)
		} catch (err) {
			if (err instanceof ValidationError) return BadRequest(mapYupErrors(err.inner))
			return InternalServerError({ message: err.message })
		}
	}
}

export default new AuthController()
