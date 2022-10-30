import { Genres } from '../../src/helpers/genres';

import { testUser } from './users.mock';

export const beetlejuiceMovie = {
  actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
  director: 'Tim Burton',
  genres: [Genres.Comedy, Genres.Fantasy],
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  registeredBy: testUser,
  title: 'Beetlejuice',
  year: 1988,
};

export const shawshankRedemption = {
  actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
  director: 'Frank Darabont',
  genres: [Genres.Crime, Genres.Drama],
  plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  registeredBy: testUser,
  title: 'The Shawshank Redemption',
  year: 1994,
};

export const crocodileDundee = {
  actors: 'Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil',
  director: 'Peter Faiman',
  genres: [Genres.Adventure, Genres.Comedy],
  plot: 'An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.',
  registeredBy: testUser,
  title: 'Crocodile Dundee',
  year: 1986,
};

export const cityOfGod = {
  actors: 'Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva',
  director: 'Fernando Meirelles, Kátia Lund',
  genres: [Genres.Crime, Genres.Drama],
  plot: 'Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.',
  registeredBy: testUser,
  title: 'City of God',
  year: 2002,
};

export const interstellar = {
  actors: 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow',
  director: 'Christopher Nolan',
  genres: [Genres.Adventure, Genres.Drama, Genres['Sci-Fi']],
  plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  registeredBy: testUser,
  title: 'Interstellar',
  year: 2014,
};

export const memento = {
  actors: 'Guy Pearce, Carrie-Anne Moss, Joe Pantoliano, Mark Boone Junior',
  director: 'Christopher Nolan',
  genres: [Genres.Mystery, Genres.Thriller],
  plot: "A man juggles searching for his wife's murderer and keeping his short-term memory loss from being an obstacle.",
  registeredBy: testUser,
  title: 'Memento',
  year: 2000,
};

export const apocalypto = {
  actors: 'Rudy Youngblood, Dalia Hernández, Jonathan Brewer, Morris Birdyellowhead',
  director: 'Mel Gibson',
  genres: [Genres.Action, Genres.Adventure, Genres.Drama],
  plot: 'As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate.',
  registeredBy: testUser,
  title: 'Apocalypto',
  year: 2006,
};
