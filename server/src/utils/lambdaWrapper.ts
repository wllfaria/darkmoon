import { APIGatewayProxyResult } from "aws-lambda"

export const buildResponse = (statusCode: number, body?: any, headers?: any): APIGatewayProxyResult => {
  const formattedBody = JSON.stringify(body)
  const formattedHeaders = headers || {}
  return {
    statusCode,
    body: formattedBody,
    headers: {
      ...formattedHeaders,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }
}

export const OK = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(200, body, headers)
}

export const Created = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(201, body, headers)
}

export const Unauthorized = (reason: string): APIGatewayProxyResult => {
  return buildResponse(401, reason, null)
}

export const InternalServerError = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(500, body, headers)
}

export const BadRequest = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(400, body, headers)
  
export const ResourceUpdated = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(204, body, headers)
}

export const NotFound = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(404, body, headers)
}