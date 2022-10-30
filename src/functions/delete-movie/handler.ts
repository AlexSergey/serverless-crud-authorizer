import { APIGatewayProxyResult } from 'aws-lambda';

import { ok } from '../../helpers/response';
import { logger } from '../../logger/logger';
import { IApiGatewayWithParams } from '../../types/api-gateway.type';

export const useDeleteMovieHandler = <T extends Function>(deleteMovie: T) => {
  return async ({ pathParameters }: IApiGatewayWithParams<null>): Promise<APIGatewayProxyResult> => {
    await deleteMovie(pathParameters.id);

    logger.info(`Movie ${pathParameters.id} was deleted`);

    return ok('success');
  };
};
