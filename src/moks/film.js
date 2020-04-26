import {MovieTitles, DescriptionItem, PostersUrl, Genres} from "./mok-data-film";
import {getRandomNumber, getRandomArrayItem, getRandomFloatNumber} from "../utils/utils";
import {generateComments} from "./comments";

const getRandomUrlPoster = () => {
  return `./images/posters${getRandomArrayItem(PostersUrl)}`;
};

const getRandomGenres = () => {
  return new Array(3)
    .fill(null)
    .map(() => getRandomArrayItem(Genres));
};

const generateDescription = () => {
  return new Array(5)
    .fill(null)
    .map(() => getRandomArrayItem(DescriptionItem))
    .join(` `);
};

const generateFilm = () => {
  const countComments = getRandomNumber(0, 5);

  const genres = getRandomGenres();
  const comments = generateComments(countComments);

  return {
    title: getRandomArrayItem(MovieTitles),
    originalTitle: getRandomArrayItem(MovieTitles),
    poster: {
      url: getRandomUrlPoster(),
    },
    description: generateDescription(),
    rating: getRandomFloatNumber(0, 10),
    year: getRandomNumber(1920, 2000),
    duration: getRandomNumber(10, 120), // продолжительность в минутах
    genres,
    comments,
    creators: {
      director: `Anthony Mann`,
      writers: `Anne Wigton, Heinz Herald, Richard Weil`,
      actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
      country: `USA`,
    },
    date: `30 March`,
    ageRating: `18+`,
    addedToWatchlist: false,
    alreadyWatched: false,
    addedToFavorite: false,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(null)
    .map(generateFilm);
};

export {generateFilms};
