import { DynamoDB } from 'aws-sdk'
import { Product, ProductCreatePayload } from '../typings/Product'
import { uuidv4 } from '../utils/lambdaUtils'

class ProductModel {
	private dynamoInstance = new DynamoDB.DocumentClient()
	private tableName = 'Products'

	public async createProduct(name: string, description: string, price: number): Promise<ProductCreatePayload> {
		const id = uuidv4()
		const shapedObject = { id, name, description, price }

		await this.dynamoInstance.put({ Item: shapedObject, TableName: this.tableName }).promise()
		return { objectLocation: `/products/${id}` }
	}

	public async getProduct(productId: string): Promise<Product> {
		const result = await this.dynamoInstance.get({ TableName: this.tableName, Key: { id: productId } }).promise()
		const product = result.Item as Product
		return product
	}

	public async deleteProduct(productId: string): Promise<void> {
		await this.dynamoInstance.delete({ TableName: this.tableName, Key: { id: productId } }).promise()
	}
}

export default new ProductModel()
