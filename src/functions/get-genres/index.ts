import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';

import { useGetGenresService, GetGenresService } from '../../services/get-genres.service';

import { useGetGenresHandler } from './handler';

const createMovieService = useGetGenresService();

const handler = middy(useGetGenresHandler<GetGenresService>(createMovieService))
  .use(
    httpResponseSerializer({
      defaultContentType: 'application/json',
      serializers: [
        {
          regex: /^application\/json$/,
          serializer: ({ body }): string => JSON.stringify(body),
        },
      ],
    }),
  )
  .use(httpErrorHandler());

export { handler };
