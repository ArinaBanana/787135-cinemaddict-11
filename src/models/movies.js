import {getFilmsByFilters, FilterTypes} from "../utils/filtration";

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._filterChangeHandlers = [];

    this._activeFilterType = FilterTypes.ALL_MOVIES;
  }

  getAllMovies() {
    return this._movies;
  }

  getMoviesByFiltration() {
    return getFilmsByFilters(this._movies, this._activeFilterType);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  setFilter(filterType) {

    if (!filterType || !Object.values(FilterTypes).includes(filterType)) {
      return false;
    }

    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);

    return true;
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._callHandlers(this._filterChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler(this._activeFilterType));
  }
}
