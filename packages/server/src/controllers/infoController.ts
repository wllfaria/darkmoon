import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { OK } from '../utils/lambdaWrapper'

class InfoController {
	public getInfo(_event: APIGatewayProxyEvent, _context: Context) {
		return OK({ appName: 'Darkmoon Cloud' })
	}
}

export default new InfoController()
