import { APIGatewayProxyResult } from 'aws-lambda';

import { ok } from '../../helpers/response';
import { logger } from '../../logger/logger';
import { IApiGatewayProxyEvent } from '../../types/api-gateway.type';
import { IMovie } from '../../types/movie.type';

export const useCreateMovieHandler = <T extends Function>(createMovie: T) => {
  return async ({ body, requestContext }: IApiGatewayProxyEvent<IMovie>): Promise<APIGatewayProxyResult> => {
    const { user } = requestContext.authorizer;
    const result = await createMovie(user, body);

    logger.info(`Movie was created. Movie title: ${body.title} with ID: ${result.id}`);

    return ok({
      id: result.id,
    });
  };
};
