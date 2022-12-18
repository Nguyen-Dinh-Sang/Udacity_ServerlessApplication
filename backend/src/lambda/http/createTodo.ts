import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { createTodoBL } from '../../helpers/businessLogic';
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoRequest : CreateTodoRequest = JSON.parse(event.body);
    const userId : string = getUserId(event);
    return {
        statusCode: 201,
        body: JSON.stringify({
          "item": await createTodoBL(todoRequest, userId)
        }),
      };
  }
)

handler.use(
  cors({
    credentials: true
  })
)
