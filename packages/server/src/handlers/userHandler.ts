import { APIGatewayProxyHandler } from 'aws-lambda'
import userController from '../controllers/userController'

export const updateInformation: APIGatewayProxyHandler = async (event, context) => {
	return userController.updateInformation(event, context)
}

export const createAddress: APIGatewayProxyHandler = async (event, context) => {
	return userController.createAddress(event, context)
}

export const updateAddresses: APIGatewayProxyHandler = async (event, context) => {
	return userController.updateAddresses(event, context)
}

export const updateThemePreference: APIGatewayProxyHandler = async (event, context) => {
	return userController.updateThemePreference(event, context)
}

export const deleteAddress: APIGatewayProxyHandler = async (event, context) => {
	return userController.deleteAddress(event, context)
}
