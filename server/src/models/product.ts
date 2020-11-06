import { Product, ProductCreateResponse } from "../typings/product"
import { DynamoDB } from 'aws-sdk'
import { uuidv4 } from "../utils/lambdaUtils"

const dynamoInstance = new DynamoDB.DocumentClient()
const tableName = "Products"

export const createProduct = async (name: string, description: string, price: number): Promise<ProductCreateResponse> => {
  const id = uuidv4()

  const shapedObject = {
    id,
    name,
    description,
    price
  }

  await dynamoInstance.put({
    Item: shapedObject,
    TableName: tableName
  }).promise()

  return {
    objectLocation: `/products/${id}`
  }
}

export const getProduct = async (productId: string): Promise<Product> => {
  const result = await dynamoInstance.get({
    TableName: tableName,
    Key: {
      'id': productId
    }
  }).promise()
  const product = result.Item as Product
  return product
}

export const deleteProduct = async (productId: string): Promise<void> => {
  await dynamoInstance.delete({
    TableName: tableName,
    Key: {
      id: productId
    }
  }).promise()
}