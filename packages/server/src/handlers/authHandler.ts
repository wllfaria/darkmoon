import { APIGatewayProxyHandler } from 'aws-lambda'
import authHandler from '../controllers/authController'

export const checkAuthentication: APIGatewayProxyHandler = async (event, context) => {
	return authHandler.verify(event, context)
}

export const authenticate: APIGatewayProxyHandler = async (event, context) => {
	return authHandler.authenticate(event, context)
}
