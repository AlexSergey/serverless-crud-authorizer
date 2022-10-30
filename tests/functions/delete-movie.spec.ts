import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Mongoose } from 'mongoose';

import { useDatabase } from '../../src/database/database';
import { useDeleteMovieHandler } from '../../src/functions/delete-movie/handler';
import { IMovieModel, useMovieModel, IMovieDocument } from '../../src/models/movie';
import { DeleteMovieService, useDeleteMovieService } from '../../src/services/delete-movie.service';
import { IApiGatewayWithParams } from '../../src/types/api-gateway.type';
import { apocalypto } from '../mocks/movies.mock';
import { requestMaker } from '../mocks/request-maker';

describe('delete movie function tests', () => {
  let mongoose: Mongoose;
  let movieModel: IMovieModel;
  let id: string;

  const db = useDatabase(process.env.MONGO_URL as string);

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

  beforeAll(async () => {
    mongoose = await db.connect();
    movieModel = useMovieModel(mongoose);
    const createdMovie = await movieModel.create(apocalypto);
    id = createdMovie._id;
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await db.close();
  });

  it('delete 1 existed movie', async () => {
    const existedMovie = (await movieModel.findById(id)) as IMovieDocument;

    expect(existedMovie.title).toBe(apocalypto.title);

    const { event, context } = requestMaker<IApiGatewayWithParams<null>>({
      params: {
        id,
      },
    });
    await handler(event, context);

    expect(await movieModel.findById(id)).toBeNull();
  });
});
