import { useMovieModel } from '../models/movie';
import { IMovie } from '../types/movie.type';
import { IServiceParams } from '../types/service.type';

export type UpdateMovieService = (id: string, user: string, body: IMovie) => Promise<void>;

export const useUpdateMovieService = ({ db }: IServiceParams): UpdateMovieService => {
  return async (id: string, user: string, movie: IMovie): Promise<void> => {
    const mongoose = await db.connect();
    const movieModel = useMovieModel(mongoose);
    await movieModel.findByIdAndUpdate(id, { ...movie, updatedBy: user });
  };
};
