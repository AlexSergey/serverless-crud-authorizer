import { Context } from 'aws-lambda';

import { Genres } from '../../src/helpers/genres';
import { IQuery } from '../../src/types/api-gateway.type';
import { IMovie } from '../../src/types/movie.type';

interface IRequestResult<TEvent> {
  context: Context;
  event: TEvent;
}

interface IP {
  id?: string;
}

interface IQ {
  params?: IQuery;
  genres?: Genres[];
}

interface IRequestParams {
  authorizationToken?: string;
  query?: IQ;
  params?: IP;
  movie?: IMovie;
  user?: string;
}

/* export const requestMaker: IRequestApi = {
  empty: () => ({
    context: {} as Context,
    event: {
      body: null,
    } as IApiGatewayProxyEvent<null>,
  }),
  withMovieAndUser: (movie: IMovie, user: string): IRequest<IApiGatewayProxyEvent<IMovie>> => ({
    context: {} as Context,
    event: {
      body: movie,
      requestContext: {
        authorizer: {
          user,
        },
      },
    } as IApiGatewayProxyEvent<IMovie>,
  }),
  withQuery: (queryStringParameters: IQuery, genres?: Genres[]): IRequest<IApiGatewayWithQuery<null>> => ({
    context: {} as Context,
    event: {
      body: null,
      multiValueQueryStringParameters: {
        genres,
      },
      queryStringParameters,
    } as IApiGatewayWithQuery<null>,
  }),
}; */

const empty = <TEvent>(authorizationToken?: string): IRequestResult<TEvent> => ({
  context: {} as Context,
  event: {
    authorizationToken,
    body: {},
    requestContext: {
      authorizer: {},
    },
  } as TEvent,
});

const withParams = <TEvent>(params: IP, movie?: IMovie, user?: string): IRequestResult<TEvent> => {
  const awsEvent: Record<string, unknown> = {};

  if (params) {
    awsEvent.pathParameters = params;
  }

  if (movie) {
    awsEvent.body = movie;
  }

  if (user) {
    awsEvent.requestContext = {
      authorizer: user,
    };
  }

  const event = awsEvent as TEvent;

  return {
    context: {} as Context,
    event: event as TEvent,
  };
};

const withQuery = <TEvent>(query: IQ, movie?: IMovie, user?: string): IRequestResult<TEvent> => {
  const awsEvent: Record<string, unknown> = {};

  if (query.params) {
    awsEvent.queryStringParameters = query.params;
  }

  if (query.genres) {
    awsEvent.multiValueQueryStringParameters = {
      genres: query.genres,
    };
  }

  if (movie) {
    awsEvent.body = movie;
  }

  if (user) {
    awsEvent.requestContext = {
      authorizer: user,
    };
  }

  const event = awsEvent as TEvent;

  return {
    context: {} as Context,
    event: event as TEvent,
  };
};

const pure = <TEvent>(movie?: IMovie, user?: string): IRequestResult<TEvent> => ({
  context: {} as Context,
  event: {
    body: movie,
    requestContext: {
      authorizer: {
        user,
      },
    },
  } as TEvent,
});

export const requestMaker = <TResult>(requestMakerParams?: IRequestParams): IRequestResult<TResult> => {
  if (!requestMakerParams) {
    return empty();
  }
  const { query, params, movie, user, authorizationToken } = requestMakerParams;
  if (!query && !params && !movie && !user && authorizationToken) {
    return empty(authorizationToken);
  }
  if (typeof params === 'object') {
    return withParams<TResult>(params, movie, user);
  }
  if (typeof query === 'object') {
    return withQuery<TResult>(query, movie, user);
  }

  return pure<TResult>(movie, user);
};
