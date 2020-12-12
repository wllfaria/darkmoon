import * as jwt from 'jsonwebtoken'
import { AuthUser } from '@darkmoon/typings/Auth'
import { Unauthorized } from './lambdaWrapper'
import { APIGatewayProxyEvent } from 'aws-lambda'

const privateKey = '1c617b94-5929-42d5-a423-e0e812141162'

export const extractTokenFromHeaders = (event: APIGatewayProxyEvent): string => {
	const headers = event && event.headers
	if (!headers) {
		return null
	}

	const authorization = headers && (headers.Authorization || headers.authorization)
	if (!authorization) {
		return null
	}

	return authorization.replace('JWT', '').replace(' ', '')
}

const extractToken = args => {
	const functionArgs = args && args[0]
	if (!functionArgs) {
		return null
	}

	return extractTokenFromHeaders(functionArgs)
}

export const checkToken = (token: string): AuthUser | null => {
	try {
		const decodedToken = jwt.verify(token, privateKey)
		return decodedToken as AuthUser
	} catch (e) {
		console.error(`Failed to verify token: ${e.message}`)
		return null
	}
}

export const encodePayload = (payload: string | Record<string, unknown> | Buffer): string => {
	return jwt.sign(payload, privateKey, { expiresIn: '10d' })
}

/**
 * Decorator that overrides the lambdas
 * and kicks the request out if no or invalid
 * authorization was provided
 */
export const PrivateLambda = () => {
	return (_target: unknown, _key: string | symbol, descriptor: PropertyDescriptor) => {
		const original = descriptor.value
		descriptor.value = (...args) => {
			const authorization = extractToken(args)
			if (!authorization) {
				return Unauthorized('Missing authorization token')
			}

			const decoded = checkToken(authorization)
			if (!decoded) {
				return Unauthorized('Invalid token provided')
			}

			return original.apply(this, args)
		}
	}
}
