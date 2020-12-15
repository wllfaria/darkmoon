import { APIGatewayProxyResult } from 'aws-lambda'

export const buildResponse = (
	ok: boolean,
	statusCode: number,
	body?: unknown,
	headers?: any
): APIGatewayProxyResult => {
	const formattedBody = JSON.stringify({ ok, body })
	const formattedHeaders = headers || {}
	return {
		statusCode,
		body: formattedBody,
		headers: {
			...formattedHeaders,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	}
}

export const OK = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(true, 200, body, headers)
}

export const Created = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(true, 201, body, headers)
}

export const ResourceUpdated = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(true, 204, body, headers)
}

export const BadRequest = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(false, 400, body, headers)
}

export const Unauthorized = (reason: string): APIGatewayProxyResult => {
	return buildResponse(false, 401, reason, null)
}

export const NotFound = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(false, 404, body, headers)
}

export const InternalServerError = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(false, 500, body, headers)
}
