import { APIGatewayProxyResult } from 'aws-lambda';

import { ok } from '../../helpers/response';
import { logger } from '../../logger/logger';
import { IApiGatewayWithQuery, IQuery } from '../../types/api-gateway.type';

export const useGetMoviesHandler = <T extends Function>(getMovies: T) => {
  return async ({
    queryStringParameters,
    multiValueQueryStringParameters,
  }: IApiGatewayWithQuery<null | IQuery>): Promise<APIGatewayProxyResult> => {
    const genres = multiValueQueryStringParameters ? multiValueQueryStringParameters.genres : [];
    const result = await getMovies(queryStringParameters, genres);

    logger.info(`Result ${result.length} movies`);

    return ok(result);
  };
};
