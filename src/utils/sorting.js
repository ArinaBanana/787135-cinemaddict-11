const SortTypes = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortTypes.DATE:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortTypes.RATING:
      sortedFilms = showingFilms.sort((a, b) => a.rating - b.rating);
      break;
    case SortTypes.DEFAULT:
    default:
      sortedFilms = showingFilms;
  }

  return sortedFilms;
};

export {SortTypes, getSortedFilms};
