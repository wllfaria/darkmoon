import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { buildOKResponse } from '../utils/lambdaWrapper';

export const getInfo: APIGatewayProxyHandler = async (_event, _context) => {
  return buildOKResponse({
    ok: true,
    serviceName: "Darkmoon Cloud"
  })
}
