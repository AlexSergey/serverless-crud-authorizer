import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

import { verifyToken } from '../../src/functions/authorizer';
import { requestMaker } from '../mocks/request-maker';

describe('authorizer function tests', () => {
  it('check authorizer without token', async () => {
    const { event } = requestMaker<APIGatewayTokenAuthorizerEvent>();
    const res = (await verifyToken(event)) as APIGatewayAuthorizerResult;

    expect(res.context).toBeNull();
    expect(res.policyDocument.Statement).toEqual([
      {
        Action: ['execute-api:Invoke'],
        Effect: 'Deny',
        Resource: undefined,
      },
    ]);
  });

  it('check authorizer with valid token', async () => {
    const { event } = requestMaker<APIGatewayTokenAuthorizerEvent>({
      authorizationToken: 'Bearer mytoken',
    });
    const res = (await verifyToken(event)) as APIGatewayAuthorizerResult;

    expect(res.context).toEqual({
      user: 'User',
    });
    expect(res.policyDocument.Statement).toEqual([
      {
        Action: ['execute-api:Invoke'],
        Effect: 'Allow',
        Resource: undefined,
      },
    ]);
  });
});
