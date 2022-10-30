import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Mongoose } from 'mongoose';

import { useDatabase } from '../../src/database/database';
import { useCreateMovieHandler } from '../../src/functions/create-movie/handler';
import { IMovieModel, useMovieModel } from '../../src/models/movie';
import { CreateMovieService, useCreateMovieService } from '../../src/services/create-movie.service';
import { IApiGatewayProxyEvent } from '../../src/types/api-gateway.type';
import { IMovie } from '../../src/types/movie.type';
import { beetlejuiceMovie } from '../mocks/movies.mock';
import { requestMaker } from '../mocks/request-maker';
import { testUser } from '../mocks/users.mock';

describe('create movie function tests', () => {
  let mongoose: Mongoose;
  let movieModel: IMovieModel;

  const db = useDatabase(process.env.MONGO_URL as string);

  const createMovieService = useCreateMovieService({ db });

  const handler = middy(useCreateMovieHandler<CreateMovieService>(createMovieService))
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
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await db.close();
  });

  it('create movie with correct user and body', async () => {
    const { event, context } = requestMaker<IApiGatewayProxyEvent<IMovie>>({
      movie: beetlejuiceMovie,
      user: testUser,
    });
    const res = await handler(event, context);
    const body = JSON.parse(res.body);
    const existedMovie = await movieModel.findById(body.id);

    if (!existedMovie) {
      throw new Error("Movie wasn't created");
    }

    expect(res.statusCode).toBe(200);

    expect({
      ...beetlejuiceMovie,
      ...{ registeredBy: testUser },
    }).toEqual({
      actors: existedMovie.actors,
      director: existedMovie.director,
      genres: existedMovie.genres,
      plot: existedMovie.plot,
      registeredBy: existedMovie.registeredBy,
      title: existedMovie.title,
      year: existedMovie.year,
    });
  });
});
