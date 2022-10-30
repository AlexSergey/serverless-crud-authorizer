import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Mongoose } from 'mongoose';

import { useDatabase } from '../../src/database/database';
import { useUpdateMovieHandler } from '../../src/functions/update-movie/handler';
import { IMovieModel, useMovieModel, IMovieDocument } from '../../src/models/movie';
import { UpdateMovieService, useUpdateMovieService } from '../../src/services/update-movie.service';
import { IApiGatewayWithParams } from '../../src/types/api-gateway.type';
import { IMovie } from '../../src/types/movie.type';
import { apocalypto, beetlejuiceMovie } from '../mocks/movies.mock';
import { requestMaker } from '../mocks/request-maker';
import { testUser } from '../mocks/users.mock';

describe('update movie function tests', () => {
  let mongoose: Mongoose;
  let movieModel: IMovieModel;
  let id: string;

  const db = useDatabase(process.env.MONGO_URL as string);

  const deleteMovieService = useUpdateMovieService({ db });

  const handler = middy(useUpdateMovieHandler<UpdateMovieService>(deleteMovieService))
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

  it('update Apocalypto movie to Beetlejuice', async () => {
    const existedMovie = (await movieModel.findById(id)) as IMovieDocument;

    expect(existedMovie.title).toBe(apocalypto.title);

    const { event, context } = requestMaker<IApiGatewayWithParams<IMovie>>({
      movie: beetlejuiceMovie,
      params: {
        id,
      },
      user: testUser,
    });
    await handler(event, context);

    const updatedMovie = (await movieModel.findById(id)) as IMovieDocument;

    expect({
      actors: updatedMovie.actors,
      director: updatedMovie.director,
      genres: updatedMovie.genres,
      plot: updatedMovie.plot,
      registeredBy: updatedMovie.registeredBy,
      title: updatedMovie.title,
      year: updatedMovie.year,
    }).toEqual(beetlejuiceMovie);
  });
});
