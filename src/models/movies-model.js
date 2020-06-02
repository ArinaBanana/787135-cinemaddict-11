import {FilterTypes, getFilmsByFilters} from "../utils/filtration";
import {getSortedFilms, SortTypes} from "../utils/sorting";
import {EXTRA_SORT_TYPE} from "../utils/constant";

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._filterChangeHandlers = [];
    this._sortingChangeHandlers = [];
    this._filmChangeHandlers = [];
    this._filmsChangeHandlers = [];

    this._currentFilterType = FilterTypes.ALL_MOVIES;
    this._currentSortType = SortTypes.DEFAULT;
  }

  getAllMovies() {
    return this._movies;
  }

  getFilteredAndSortedMovies() {
    const filtered = getFilmsByFilters(this._movies, this._currentFilterType);
    return getSortedFilms(filtered, this._currentSortType);
  }

  getRatingSortedMovies() {
    return getSortedFilms(this._movies, SortTypes.RATING);
  }

  getCommentsSortedMovies() {
    return getSortedFilms(this._movies, EXTRA_SORT_TYPE);
  }

  getWatchedMovies() {
    return this._movies.filter((movie) => movie.alreadyWatched);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
    this._callHandlers(this._filmsChangeHandlers, this._movies);
  }

  getCurrentFilter() {
    return this._currentFilterType;
  }

  getCurrentSortType() {
    return this._currentSortType;
  }

  setFilter(filterType) {
    this._currentFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers, this._currentFilterType);
  }

  setSortType(sortType) {
    this._currentSortType = sortType;
    this._callHandlers(this._sortingChangeHandlers, this._currentSortType);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortingChangeHandlers(handler) {
    this._sortingChangeHandlers.push(handler);
  }

  setFilmChangeHandlers(handler) {
    this._filmChangeHandlers.push(handler);
  }

  setFilmsChangeHandlers(handler) {
    this._filmsChangeHandlers.push(handler);
  }

  updateMovie(movie) {
    const index = this._movies.findIndex((it) => it.id === movie.id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._callHandlers(this._filmChangeHandlers, movie);

    return true;
  }

  _callHandlers(handlers, data) {
    handlers.forEach((handler) => handler(data));
  }
}
