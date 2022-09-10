import { APIGatewayProxyEventBase } from 'aws-lambda';

export const helloWorld = async (event: APIGatewayProxyEventBase<{ user: string }>) => {
  console.log('hello world lambda is running');
  const user = event.requestContext.authorizer.user;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world',
      user
    })
  };
};
