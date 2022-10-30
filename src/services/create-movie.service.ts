import { useMovieModel, IMovieDocument } from '../models/movie';
import { IMovie } from '../types/movie.type';
import { IServiceParams } from '../types/service.type';

export type CreateMovieService = (user: string, movie: IMovie) => Promise<IMovieDocument>;

export const useCreateMovieService = ({ db }: IServiceParams): CreateMovieService => {
  return async (user: string, movie: IMovie): Promise<IMovieDocument> => {
    const mongoose = await db.connect();
    const movieModel = useMovieModel(mongoose);

    return await movieModel.create({ ...movie, registeredBy: user });
  };
};
