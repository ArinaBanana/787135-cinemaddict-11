import AbstractMoviesListAdapter from "./abstract-movies-list-adapter";
import {SHOWED_EXTRA_FILMS_COUNT} from "../utils/constant";

export default class TopRatedMoviesListAdapter extends AbstractMoviesListAdapter {
  getMovies() {
    return this._moviesModel
      .getRatingSortedMovies()
      .filter((movie) => movie.rating > 0)
      .slice(0, SHOWED_EXTRA_FILMS_COUNT);
  }
}
