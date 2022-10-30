import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';

import { useGetGenresHandler } from '../../src/functions/get-genres/handler';
import { Genres } from '../../src/helpers/genres';
import { GetGenresService, useGetGenresService } from '../../src/services/get-genres.service';
import { IApiGatewayWithQuery } from '../../src/types/api-gateway.type';
import { requestMaker } from '../mocks/request-maker';

describe('get genres function tests', () => {
  const getMoviesService = useGetGenresService();

  const handler = middy(useGetGenresHandler<GetGenresService>(getMoviesService))
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

  it('check hardcoded genres', async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<null>>();
    const res = await handler(event, context);
    const body: Genres[] = JSON.parse(res.body);

    expect(body).toEqual([
      Genres.Comedy,
      Genres.Fantasy,
      Genres.Crime,
      Genres.Drama,
      Genres.Music,
      Genres.Adventure,
      Genres.History,
      Genres.Thriller,
      Genres.Animation,
      Genres.Family,
      Genres.Mystery,
      Genres.Biography,
      Genres.Action,
      Genres['Film-Noir'],
      Genres.Romance,
      Genres['Sci-Fi'],
      Genres.War,
      Genres.Western,
      Genres.Horror,
      Genres.Musical,
      Genres.Sport,
    ]);
  });
});
