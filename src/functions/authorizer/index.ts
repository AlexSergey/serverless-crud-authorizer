import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';

const checkToken = (token: undefined | string): boolean => typeof token === 'string' && token.indexOf('Bearer') === 0;

const verifyToken = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  const isAuthorized = checkToken(event.authorizationToken);

  return {
    context: isAuthorized
      ? {
          user: 'User',
        }
      : null,
    policyDocument: {
      Statement: [
        {
          Action: ['execute-api:Invoke'],
          Effect: isAuthorized ? 'Allow' : 'Deny',
          Resource: event.methodArn,
        },
      ],
      Version: '2012-10-17',
    },
    principalId: 'anonymous',
  };
};

export { verifyToken };
