import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Mongoose } from 'mongoose';

import { useDatabase } from '../../src/database/database';
import { useGetMoviesHandler } from '../../src/functions/get-movies/handler';
import { Genres } from '../../src/helpers/genres';
import { IMovieModel, useMovieModel } from '../../src/models/movie';
import { GetMoviesService, IMovieShort, useGetMoviesService } from '../../src/services/get-movies.service';
import { IApiGatewayWithQuery } from '../../src/types/api-gateway.type';
import {
  apocalypto,
  beetlejuiceMovie,
  cityOfGod,
  crocodileDundee,
  interstellar,
  memento,
  shawshankRedemption,
} from '../mocks/movies.mock';
import { requestMaker } from '../mocks/request-maker';

describe('get movies function tests', () => {
  let mongoose: Mongoose;
  let movieModel: IMovieModel;

  const db = useDatabase(process.env.MONGO_URL as string);

  const getMoviesService = useGetMoviesService({ db });

  const handler = middy(useGetMoviesHandler<GetMoviesService>(getMoviesService))
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
    await movieModel.create(
      beetlejuiceMovie,
      cityOfGod,
      crocodileDundee,
      shawshankRedemption,
      interstellar,
      memento,
      apocalypto,
    );
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await db.close();
  });

  it('get movies without params', async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<null>>();
    const res = await handler(event, context);
    const body: IMovieShort[] = JSON.parse(res.body);
    const titles = body.map((movie) => movie.title);

    expect(titles.includes(beetlejuiceMovie.title)).toBeTruthy();
    expect(titles.includes(cityOfGod.title)).toBeTruthy();
    expect(titles.includes(crocodileDundee.title)).toBeTruthy();
    expect(titles.includes(shawshankRedemption.title)).toBeTruthy();
  });

  it('get movies by year', async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<{ year: number }>>({
      query: {
        params: {
          year: 2002,
        },
      },
    });
    const res = await handler(event, context);
    const body: IMovieShort[] = JSON.parse(res.body);
    const titles = body.map((movie) => movie.title);

    expect(titles.length).toBe(1);
    expect(titles.includes(cityOfGod.title)).toBeTruthy();
  });

  it('get movies by year', async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<{ year: number }>>({
      query: {
        params: {
          year: 2002,
        },
      },
    });
    const res = await handler(event, context);
    const body: IMovieShort[] = JSON.parse(res.body);
    const titles = body.map((movie) => movie.title);

    expect(titles.length).toBe(1);
    expect(titles.includes(cityOfGod.title)).toBeTruthy();
  });

  it("get movies - 2 Christopher Nolan's films by director filter", async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<{ director: string }>>({
      query: {
        params: {
          director: 'Christopher Nolan',
        },
      },
    });
    const res = await handler(event, context);
    const body: IMovieShort[] = JSON.parse(res.body);
    const titles = body.map((movie) => movie.title);

    expect(titles.length).toBe(2);
    expect(titles.includes(interstellar.title)).toBeTruthy();
    expect(titles.includes(memento.title)).toBeTruthy();
  });

  it("get movies - 2 Christopher Nolan's films by director filter", async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<{ director: string }>>({
      query: {
        params: {
          director: 'Christopher Nolan',
        },
      },
    });
    const res = await handler(event, context);
    const body: IMovieShort[] = JSON.parse(res.body);
    const titles = body.map((movie) => movie.title);

    expect(titles.length).toBe(2);
    expect(titles.includes(interstellar.title)).toBeTruthy();
    expect(titles.includes(memento.title)).toBeTruthy();
  });

  it(`get movies - filtered 2 movies by 2 genres: ${Genres.Drama}, ${Genres.Adventure}`, async () => {
    const { event, context } = requestMaker<IApiGatewayWithQuery<null>>({
      query: {
        genres: [Genres.Adventure, Genres.Drama],
      },
    });
    const res = await handler(event, context);
    const body: IMovieShort[] = JSON.parse(res.body);
    const titles = body.map((movie) => movie.title);

    expect(titles.length).toBe(2);
    expect(titles.includes(interstellar.title)).toBeTruthy();
    expect(titles.includes(apocalypto.title)).toBeTruthy();
  });
});
