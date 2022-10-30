import { APIGatewayProxyEventBase } from 'aws-lambda';

import { Genres } from '../helpers/genres';

export interface IAuthorizer {
  user: string;
}

export interface IQuery {
  year?: number;
  director?: string;
  title?: string;
  genre?: string;
}

export interface IApiGatewayProxyEvent<TBody = {}> extends Omit<APIGatewayProxyEventBase<IAuthorizer>, 'body'> {
  body: TBody;
}

export interface IApiGatewayWithParams<TBody = {}> extends Omit<IApiGatewayProxyEvent<TBody>, 'pathParameters'> {
  pathParameters: {
    id: string;
  };
}

export interface IApiGatewayWithQuery<TBody = {}>
  extends Omit<IApiGatewayProxyEvent<TBody>, 'queryStringParameters' | 'multiValueQueryStringParameters'> {
  queryStringParameters: IQuery;
  multiValueQueryStringParameters: {
    genres?: Genres[];
  };
}
