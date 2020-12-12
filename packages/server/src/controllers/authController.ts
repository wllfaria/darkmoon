import { APIGatewayProxyEvent } from 'aws-lambda'
import { Context } from 'vm'
import { authenticate } from '../models/authModel'
import { LoginSchema } from '@darkmoon/typings/Auth'
import { checkToken, extractTokenFromHeaders } from '../utils/authUtils'
import { parseBody } from '../utils/lambdaUtils'
import { BadRequest, InternalServerError, OK } from '../utils/lambdaWrapper'

class Auth {
	public verify(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const token = extractTokenFromHeaders(event)
			const decoded = checkToken(token)
			if (!decoded || !token) {
				return BadRequest({ message: 'Invalid or missing token' })
			}
			return OK({
				token: decoded
			})
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}

	public async authenticate(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const body = parseBody(event.body)
			const isValid = await LoginSchema.validate(body)
			if (!isValid) {
				return BadRequest({ message: 'Missing or badly shaped credentials' })
			}

			const shaped = await LoginSchema.cast(body)
			const signed = await authenticate(shaped.username, shaped.password)
			return OK(signed)
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}
}

const handler = new Auth()
export default handler
