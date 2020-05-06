const FilterTypes = {
  ALL_MOVIES: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const getFilmsInWatchlist = (films) => {
  return films.filter((film) => film.addedToWatchlist);
};

const getFilmsInHistory = (films) => {
  return films.filter((film) => film.alreadyWatched);
};

const getFilmsInFavorites = (films) => {
  return films.filter((film) => film.addedToFavorite);
};

const getFilmsByFilters = (films, filterType) => {
  switch (filterType) {
    case FilterTypes.WATCHLIST:
      return getFilmsInWatchlist(films);
    case FilterTypes.HISTORY:
      return getFilmsInHistory(films);
    case FilterTypes.FAVORITES:
      return getFilmsInFavorites(films);
    case FilterTypes.ALL_MOVIES:
    default:
      return films;
  }
};

export {getFilmsByFilters, FilterTypes};
