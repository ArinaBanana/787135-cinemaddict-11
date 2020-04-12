import {MovieTitles, DescriptionItem, PostersUrl, Genre} from "./mok-data-film";

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomFloatNumber = (min, max, precision = 1) => {
  return (min + Math.random() * (max - min)).toFixed(precision);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);

  return array[randomIndex];
};

const getRandomUrlPoster = () => {
  return `./images/posters${getRandomArrayItem(PostersUrl)}`;
};

const generateDescription = () => {
  return new Array(5)
    .fill(null)
    .map(() => getRandomArrayItem(DescriptionItem))
    .join(` `);
};

const generateFilm = () => {
  return {
    title: getRandomArrayItem(MovieTitles),
    poster: {
      url: getRandomUrlPoster(),
    },
    description: generateDescription(),
    rating: getRandomFloatNumber(0, 10),
    year: getRandomNumber(1920, 2000),
    duration: getRandomNumber(10, 120), // продолжительность в минутах
    genre: getRandomArrayItem(Genre),
    commentsCount: getRandomNumber(0, 5),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(null)
    .map(generateFilm);
};

export {generateFilms};
