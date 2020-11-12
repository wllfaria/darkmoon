import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import infoHandler from '../controllers/info'

export const getInfo: APIGatewayProxyHandler = async (event, context) => {
	return infoHandler.getInfo(event, context)
}
