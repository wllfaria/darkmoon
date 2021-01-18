import { DynamoDB } from 'aws-sdk'
import { Product } from '../typings/Product'

class ProductModel {
	private dynamoInstance = new DynamoDB.DocumentClient()
	private tableName = 'Products'

	public async getByName(productId: string): Promise<Product> {
		const result = await this.dynamoInstance.get({ TableName: this.tableName, Key: { id: productId } }).promise()
		const product = result.Item as Product
		return product
	}
}

export default new ProductModel()
