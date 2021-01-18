import { APIGatewayProxyHandler } from 'aws-lambda'
import productController from '../controllers/productController'

export const getByName: APIGatewayProxyHandler = (event, context) => {
	return productController.getByName(event, context)
}
