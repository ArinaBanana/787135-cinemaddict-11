import AbstractMoviesListAdapter from "./abstract-movies-list-adapter";

export default class MostCommentedMoviesListAdapter extends AbstractMoviesListAdapter {
  getMovies() {
    return this._moviesModel.getMostCommentedMovies();
  }
}
