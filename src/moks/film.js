import {MovieTitles, DescriptionItem, PostersUrl, Genres} from "./mok-data-film";
import {getRandomNumber, getRandomArrayItem, getRandomFloatNumber} from "../utils/utils";
import {generateComments} from "./comments";

const START_OF_PERIOD_TIMESTAMP = -1577934000000;
const END_OF_PERIOD_TIMESTAMP = 978210000000;

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

const makeIdGenerator = () => {
  let counter = 0;

  return () => {
    return counter++;
  };
};

const getNextId = makeIdGenerator();

const generateFilm = () => {
  const countComments = getRandomNumber(0, 5);

  const genres = getRandomGenres();
  const comments = generateComments(countComments);

  return {
    id: getNextId(),
    title: getRandomArrayItem(MovieTitles),
    originalTitle: getRandomArrayItem(MovieTitles),
    poster: {
      url: getRandomUrlPoster(),
    },
    description: generateDescription(),
    rating: getRandomFloatNumber(0, 10),
    duration: getRandomNumber(10, 120), // продолжительность в минутах
    genres,
    comments,
    creators: {
      director: `Anthony Mann`,
      writers: `Anne Wigton, Heinz Herald, Richard Weil`,
      actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
      country: `USA`,
    },
    ageRating: `18+`,
    addedToWatchlist: false,
    alreadyWatched: false,
    addedToFavorite: false,
    releaseDate: getRandomNumber(START_OF_PERIOD_TIMESTAMP, END_OF_PERIOD_TIMESTAMP),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(null)
    .map(generateFilm);
};

export {generateFilms};
