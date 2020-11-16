import { APIGatewayProxyEvent } from 'aws-lambda'
import { createProduct, deleteProduct, getProduct } from '../models/product'
import { productCreateSchema, productGetSchema } from '../typings/productTypes'
import { PrivateLambda } from '../utils/authUtils'
import { parseBody } from '../utils/lambdaUtils'
import { BadRequest, Created, InternalServerError, NotFound, OK, ResourceUpdated } from '../utils/lambdaWrapper'

class Product {
	@PrivateLambda()
	public async create(event: APIGatewayProxyEvent, _context) {
		try {
			const body = parseBody(event.body)
			const isValid = await productCreateSchema.isValid(body)
			if (!isValid) {
				return BadRequest({
					message: 'Invalid data. Check the data provided'
				})
			}

			const shaped = productCreateSchema.cast(body)
			const result = await createProduct(shaped.name, shaped.description, shaped.price)

			return Created(result)
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}

	public async getProduct(event: APIGatewayProxyEvent, _context) {
		try {
			const parameters = event.pathParameters
			const isValid = await productGetSchema.isValid(parameters)
			if (!isValid) {
				return BadRequest({
					message: 'Invalid data. Check productId'
				})
			}

			const shaped = productGetSchema.cast(parameters)
			const product = await getProduct(shaped.productId)
			if (!product) {
				return NotFound()
			}
			return OK(product)
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}

	@PrivateLambda()
	public async deleteProduct(event: APIGatewayProxyEvent, _context) {
		try {
			const parameters = event.pathParameters
			const isValid = await productGetSchema.isValid(parameters)
			if (!isValid) {
				return BadRequest({
					message: 'Invalid data. Check productId'
				})
			}

			const shaped = productGetSchema.cast(parameters)
			await deleteProduct(shaped.productId)
			return ResourceUpdated()
			return
		} catch (e) {
			return InternalServerError({ message: e })
		}
	}
}

export default new Product()
