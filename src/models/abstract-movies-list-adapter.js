export default class AbstractMoviesListAdapter {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
  }

  setFilterChangeHandlers(handler) {
    this._moviesModel.setFilterChangeHandlers(handler);
  }

  setSortingChangeHandlers(handler) {
    this._moviesModel.setSortingChangeHandlers(handler);
  }

  setFilmChangeHandlers(handler) {
    this._moviesModel.setFilmChangeHandlers(handler);
  }

  setFilmsChangeHandlers(handler) {
    this._moviesModel.setFilmsChangeHandlers(handler);
  }

  updateFilm(film) {
    this._moviesModel.updateMovie(film);
  }

  getMovies() {
    throw new Error(`Abstract method not implemented: getMovies`);
  }
}
