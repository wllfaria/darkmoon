import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { PrivateLambda } from "../handlers/auth";
import { InternalServerError, OK } from "../utils/lambdaWrapper";

class Info {

  public getInfo(event: APIGatewayProxyEvent, context: Context) {
    try {
      return OK({
        appName: 'Darkmoon Cloud'
      })
    } catch (e) {
      return InternalServerError({ message: e })
    }
  }
}

const infoHandler = new Info()
export default infoHandler