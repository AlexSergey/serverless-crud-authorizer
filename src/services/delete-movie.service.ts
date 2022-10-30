import { useMovieModel } from '../models/movie';
import { IServiceParams } from '../types/service.type';

export type DeleteMovieService = (id: string) => Promise<void>;

export const useDeleteMovieService = ({ db }: IServiceParams): DeleteMovieService => {
  return async (id: string): Promise<void> => {
    const mongoose = await db.connect();
    const movieModel = useMovieModel(mongoose);
    await movieModel.findByIdAndDelete(id);
  };
};
