import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';

import { getConfig } from '../../config/get-config';
import { getMongoUrl } from '../../config/mongo-config';
import { useDatabase } from '../../database/database';
import { CreateMovieService, useCreateMovieService } from '../../services/create-movie.service';

import { useCreateMovieHandler } from './handler';

const mongoDbConnectionString = getMongoUrl(getConfig);

const db = useDatabase(mongoDbConnectionString);

const createMovieService = useCreateMovieService({ db });

const handler = middy(useCreateMovieHandler<CreateMovieService>(createMovieService))
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
