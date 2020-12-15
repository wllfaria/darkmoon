import { APIGatewayProxyHandler } from 'aws-lambda'
import InfoController from '../controllers/infoController'

export const getInfo: APIGatewayProxyHandler = async (event, context) => {
	return InfoController.getInfo(event, context)
}
