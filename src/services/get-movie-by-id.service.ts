import { IMovieDocument, useMovieModel } from '../models/movie';
import { IServiceParams } from '../types/service.type';

export type GetMovieByIdService = (id: string) => Promise<IMovieDocument | null>;

export const useGetMovieByIdService = ({ db }: IServiceParams): GetMovieByIdService => {
  return async (id: string): Promise<IMovieDocument | null> => {
    const mongoose = await db.connect();
    const movieModel = useMovieModel(mongoose);

    return movieModel.findById(id);
  };
};
