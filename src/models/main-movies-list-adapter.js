import AbstractMoviesListAdapter from "./abstract-movies-list-adapter";

export default class MainMoviesListAdapter extends AbstractMoviesListAdapter {
  getMovies() {
    return this._moviesModel.getFilteredAndSortedMovies();
  }
}
