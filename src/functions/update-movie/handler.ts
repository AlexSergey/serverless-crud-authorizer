import { APIGatewayProxyResult } from 'aws-lambda';

import { ok } from '../../helpers/response';
import { logger } from '../../logger/logger';
import { IApiGatewayWithParams } from '../../types/api-gateway.type';
import { IMovie } from '../../types/movie.type';

export const useUpdateMovieHandler = <T extends Function>(updateMovie: T) => {
  return async ({
    pathParameters,
    body,
    requestContext,
  }: IApiGatewayWithParams<IMovie>): Promise<APIGatewayProxyResult> => {
    await updateMovie(pathParameters.id);
    const { user } = requestContext.authorizer;
    await updateMovie(pathParameters.id, user, body);

    logger.info(`Movie ${pathParameters.id} was updated`);

    return ok('success');
  };
};
