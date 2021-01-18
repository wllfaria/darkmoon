import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import productModel from '../models/productModel'
import { productGetSchema } from '../typings/Product'
import { BadRequest, InternalServerError, NotFound, OK } from '../utils/lambdaWrapper'

class ProductController {
	public async getByName(event: APIGatewayProxyEvent, _context: Context) {
		try {
			const parameters = event.pathParameters

			const isValid = await productGetSchema.isValid(parameters)
			if (!isValid) return BadRequest({ message: 'Invalid data. Check productId' })

			const shaped = productGetSchema.cast(parameters)
			const product = await productModel.getByName(shaped.productId)

			if (!product) return NotFound()

			return OK(product)
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}
}

export default new ProductController()
