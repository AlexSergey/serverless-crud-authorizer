import { Genres } from '../helpers/genres';
import { useMovieModel } from '../models/movie';
import { IQuery } from '../types/api-gateway.type';
import { IServiceParams } from '../types/service.type';

export interface IMovieShort {
  title: string;
  id: string;
}

interface IFilter {
  year?: number;
  title?: {
    $options: string;
    $regex: string;
  };
  director?: {
    $options: string;
    $regex: string;
  };
  genres?: {
    $options?: string;
    $regex?: string | RegExp;
    $all?: RegExp[];
  };
}

export type GetMoviesService = (query: IQuery, genresFilter: Genres[]) => Promise<IMovieShort[]>;

export const useGetMoviesService = ({ db }: IServiceParams): GetMoviesService => {
  return async (query: IQuery, genresFilter: Genres[]): Promise<IMovieShort[]> => {
    const filter: IFilter = {};

    if (query && query.year) {
      filter.year = query.year;
    }
    if (query && query.title) {
      filter.title = { $options: 'i', $regex: query.title.toLowerCase() };
    }
    if (query && query.director) {
      filter.director = { $options: 'i', $regex: query.director.toLowerCase() };
    }
    if (query && query.genre) {
      filter.genres = { $options: 'i', $regex: query.genre.toLowerCase() };
    }
    if (genresFilter && Array.isArray(genresFilter) && genresFilter.length > 0) {
      filter.genres = { $all: genresFilter.map((q) => new RegExp(q, 'i')) };
    }

    const mongoose = await db.connect();
    const movieModel = useMovieModel(mongoose);

    return (await movieModel.find(filter)).map(({ title, _id }) => ({
      id: _id,
      title,
    }));
  };
};
