import { APIGatewayProxyResult } from 'aws-lambda';

import { ok } from '../../helpers/response';
import { logger } from '../../logger/logger';
import { IApiGatewayWithParams } from '../../types/api-gateway.type';

export const useGetMovieByIdHandler = <T extends Function>(getMovieById: T) => {
  return async ({ pathParameters }: IApiGatewayWithParams<null>): Promise<APIGatewayProxyResult> => {
    const result = await getMovieById(pathParameters.id);

    logger.info(`Movie ${result.id} was found`);

    return ok(result);
  };
};
