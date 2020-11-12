import { APIGatewayProxyEvent } from 'aws-lambda'
import { Context } from 'vm'
import { authenticate } from '../models/auth'
import { checkToken, extractTokenFromHeaders } from '../utils/auth'
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
			const { username, password } = body
			if (!username || !password) {
				return BadRequest({ message: 'Missing credentials' })
			}
			const signed = await authenticate(username, password)
			return OK(signed)
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}
}

const handler = new Auth()
export default handler
