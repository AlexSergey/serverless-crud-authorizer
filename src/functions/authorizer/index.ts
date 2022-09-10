import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

const isAuthorized = (token) => token.indexOf('Bearer') === 0;

const verifyToken = async (event: APIGatewayTokenAuthorizerEvent) => {
  console.log('verifyToken', event.authorizationToken);
  return {
    context: {
      user: 'user data from token'
    },
    principalId: 'anonymous',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: isAuthorized(event.authorizationToken) ? 'Allow' : 'Deny',
          Action: [
            'execute-api:Invoke'
          ],
          Resource: event.methodArn,
        },
      ],
    },
  };
}

export { verifyToken };
