import { APIGatewayProxyHandler } from 'aws-lambda'
import authController from '../controllers/authController'

export const checkAuthentication: APIGatewayProxyHandler = async (event, context) => {
	return authController.verify(event, context)
}

export const authenticate: APIGatewayProxyHandler = async (event, context) => {
	return authController.authenticate(event, context)
}

export const register: APIGatewayProxyHandler = async (event, context) => {
	return authController.register(event, context)
}
