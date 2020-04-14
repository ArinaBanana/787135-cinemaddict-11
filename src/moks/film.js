import {MovieTitles, DescriptionItem, PostersUrl, Genres} from "./mok-data-film";
import {getRandomNumber, getRandomArrayItem, getRandomFloatNumber} from "../utils/utils";

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
  const genres = getRandomGenres();

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
    commentsCount: getRandomNumber(0, 5),
    creators: {
      director: `Anthony Mann`,
      writers: `Anne Wigton, Heinz Herald, Richard Weil`,
      actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
      country: `USA`,
    },
    date: `30 March`,
    ageRating: `18+`,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(null)
    .map(generateFilm);
};

export {generateFilms};
