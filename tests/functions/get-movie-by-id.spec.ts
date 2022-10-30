import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Mongoose } from 'mongoose';

import { useDatabase } from '../../src/database/database';
import { useGetMovieByIdHandler } from '../../src/functions/get-movie-by-id/handler';
import { IMovieModel, useMovieModel, IMovieDocument } from '../../src/models/movie';
import { GetMovieByIdService, useGetMovieByIdService } from '../../src/services/get-movie-by-id.service';
import { IApiGatewayWithParams } from '../../src/types/api-gateway.type';
import { apocalypto } from '../mocks/movies.mock';
import { requestMaker } from '../mocks/request-maker';

describe('get movie by id function tests', () => {
  let mongoose: Mongoose;
  let movieModel: IMovieModel;
  let id: string;

  const db = useDatabase(process.env.MONGO_URL as string);

  const getMovieByIdService = useGetMovieByIdService({ db });

  const handler = middy(useGetMovieByIdHandler<GetMovieByIdService>(getMovieByIdService))
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

  it('get movie by id test', async () => {
    const { event, context } = requestMaker<IApiGatewayWithParams<null>>({
      params: {
        id,
      },
    });
    const res = await handler(event, context);
    const body: IMovieDocument = JSON.parse(res.body);

    expect({
      actors: body.actors,
      director: body.director,
      genres: body.genres,
      plot: body.plot,
      registeredBy: body.registeredBy,
      title: body.title,
      year: body.year,
    }).toEqual(apocalypto);
  });
});
