import AbstractMoviesListAdapter from "./abstract-movies-list-adapter";

export default class TopRatedMoviesListAdapter extends AbstractMoviesListAdapter {
  getMovies() {
    return this._moviesModel.getTopRatedMovies();
  }
}
