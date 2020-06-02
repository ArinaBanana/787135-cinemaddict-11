import AbstractMoviesListAdapter from "./abstract-movies-list-adapter";
import {SHOWED_EXTRA_FILMS_COUNT} from "../utils/constant";

export default class MostCommentedMoviesListAdapter extends AbstractMoviesListAdapter {
  getMovies() {
    return this._moviesModel
      .getCommentsSortedMovies()
      .filter((movie) => movie.comments.length > 0)
      .slice(0, SHOWED_EXTRA_FILMS_COUNT);
  }
}
