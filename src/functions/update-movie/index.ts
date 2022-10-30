import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';

import { getConfig } from '../../config/get-config';
import { getMongoUrl } from '../../config/mongo-config';
import { useDatabase } from '../../database/database';
import { useUpdateMovieService } from '../../services/update-movie.service';

import { useUpdateMovieHandler } from './handler';

const mongoDbConnectionString = getMongoUrl(getConfig);

const db = useDatabase(mongoDbConnectionString);

const updateMovieService = useUpdateMovieService({ db });

const handler = middy(useUpdateMovieHandler(updateMovieService))
  .use(jsonBodyParser())
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
