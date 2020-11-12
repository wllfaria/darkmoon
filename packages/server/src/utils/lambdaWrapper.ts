import { APIGatewayProxyResult } from 'aws-lambda'

export const buildResponse = (statusCode: number, body?: unknown, headers?: any): APIGatewayProxyResult => {
	const formattedBody = JSON.stringify(body)
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
	return buildResponse(200, body, headers)
}

export const Created = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(201, body, headers)
}

export const Unauthorized = (reason: string): APIGatewayProxyResult => {
	return buildResponse(401, reason, null)
}

export const InternalServerError = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(500, body, headers)
}

export const BadRequest = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(400, body, headers)
}

export const ResourceUpdated = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(204, body, headers)
}

export const NotFound = (body?: unknown, headers?: unknown): APIGatewayProxyResult => {
	return buildResponse(404, body, headers)
}
