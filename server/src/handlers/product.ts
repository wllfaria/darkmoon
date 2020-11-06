import { APIGatewayProxyHandler } from "aws-lambda"
import productHandler from '../controllers/product'

export const create: APIGatewayProxyHandler = (event, context) => {
    return productHandler.create(event, context)
}

export const getOne: APIGatewayProxyHandler = (event, context) => {
    return productHandler.getProduct(event, context)
}

export const deleteOne: APIGatewayProxyHandler = (event, context) => {
    return productHandler.deleteProduct(event, context)
}