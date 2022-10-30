import { Genres } from '../helpers/genres';

export interface IMovie {
  title: string;
  year: number;
  genres: Genres[];
  director: string;
  actors: string;
  plot: string;
}
