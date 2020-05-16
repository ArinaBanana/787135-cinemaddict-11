import {getFilmsByFilters, FilterTypes} from "../utils/filtration";
import {getSortedFilms, SortTypes} from "../utils/sorting";

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._filterChangeHandlers = [];
    this._sortingChangeHandlers = [];
    this._dataChangeHandlers = [];

    this._activeFilterType = FilterTypes.ALL_MOVIES;
    this._activeSortType = SortTypes.DEFAULT;
  }

  getAllMovies() {
    return this._movies;
  }

  getMovies() {
    const filtered = getFilmsByFilters(this._movies, this._activeFilterType);
    const sorted = getSortedFilms(filtered, this._activeSortType);

    return sorted;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  setFilter(filterType) {

    if (!filterType || !Object.values(FilterTypes).includes(filterType)) {
      return false;
    }

    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers, this._activeFilterType);

    return true;
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortingChangeHandlers, this._activeSortType);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortingChangeHandlers(handler) {
    this._sortingChangeHandlers.push(handler);
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  updateMovie(movie) {
    const index = this._movies.findIndex((it) => it.id === movie.id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers, movie);

    return true;
  }

  _callHandlers(handlers, data) {
    handlers.forEach((handler) => handler(data));
  }
}
