import { APIGatewayProxyResult } from 'aws-lambda';

import { ok } from '../../helpers/response';

export const useGetGenresHandler = <T extends Function>(getGenres: T) => {
  return async (): Promise<APIGatewayProxyResult> => {
    const result = await getGenres();

    return ok(result);
  };
};
