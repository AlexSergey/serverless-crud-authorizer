import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';

import { getConfig } from '../../config/get-config';
import { getMongoUrl } from '../../config/mongo-config';
import { useDatabase } from '../../database/database';
import { useDeleteMovieService, DeleteMovieService } from '../../services/delete-movie.service';

import { useDeleteMovieHandler } from './handler';

const mongoDbConnectionString = getMongoUrl(getConfig);

const db = useDatabase(mongoDbConnectionString);

const deleteMovieService = useDeleteMovieService({ db });

const handler = middy(useDeleteMovieHandler<DeleteMovieService>(deleteMovieService))
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
