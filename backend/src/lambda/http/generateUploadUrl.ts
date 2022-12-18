import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { getUserId } from '../utils';
import { createAttachmentPresignedUrlBL } from '../../helpers/businessLogic';


export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
      const userId = getUserId(event)
      return {
        statusCode: 200,
        body: JSON.stringify({
          "uploadUrl" : await createAttachmentPresignedUrlBL(todoId, userId)
        })
      };
    }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
