import { Genres } from '../helpers/genres';

export type GetGenresService = () => Promise<Genres[]>;

export const useGetGenresService = (): GetGenresService => {
  return async () => {
    return Object.values(Genres);
  };
};
