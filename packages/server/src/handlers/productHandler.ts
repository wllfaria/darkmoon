import { APIGatewayProxyHandler } from 'aws-lambda'
import productController from '../controllers/productController'

export const create: APIGatewayProxyHandler = (event, context) => {
	return productController.create(event, context)
}

export const getOne: APIGatewayProxyHandler = (event, context) => {
	return productController.getProduct(event, context)
}

export const deleteOne: APIGatewayProxyHandler = (event, context) => {
	return productController.deleteProduct(event, context)
}
