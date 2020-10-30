import { APIGatewayProxyResult } from "aws-lambda"

export const buildResponse = (statusCode: number, body?: any, headers?: any): APIGatewayProxyResult => {
  const formattedBody = typeof(body) === 'string' ? body : JSON.stringify(body)
  return {
    statusCode,
    body: formattedBody,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }
}

export const buildOKResponse = (body?: any, headers?: any): APIGatewayProxyResult => {
  return buildResponse(200, body, headers)
}