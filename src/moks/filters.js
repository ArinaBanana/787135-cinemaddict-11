import {getRandomNumber} from "../utils/utils";

const FilterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateCountMovies = (name, countMovies) => {
  let count;

  if (name === `All movies`) {
    count = countMovies;
  } else {
    count = getRandomNumber(0, countMovies);
  }

  return count;
};

const generateFilters = (countMovies) => {
  return FilterNames.map((name, index) => {
    const isFirst = index === 0;
    return {
      name,
      count: generateCountMovies(name, countMovies),
      isActive: isFirst,
    };
  });
};

export {generateFilters};
