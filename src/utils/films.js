import MovieAdapter from "../models/movieAdapter";
import {api} from "../api";

const addToWatchlist = (film, filmUpdateHandler) => {
  const newFilm = MovieAdapter.clone(film);
  newFilm.addedToWatchlist = !newFilm.addedToWatchlist;

  api.updateMovie(film.id, newFilm).then((movie) => {
    filmUpdateHandler(movie);
  });
};

const addToWatched = (film, filmUpdateHandler) => {
  const newFilm = MovieAdapter.clone(film);
  newFilm.alreadyWatched = !newFilm.alreadyWatched;

  api.updateMovie(film.id, newFilm).then((movie) => {
    filmUpdateHandler(movie);
  });
};

const addToFavorites = (film, filmUpdateHandler) => {
  const newFilm = MovieAdapter.clone(film);
  newFilm.addedToFavorite = !newFilm.addedToFavorite;

  api.updateMovie(film.id, newFilm).then((movie) => {
    filmUpdateHandler(movie);
  });
};

export {addToWatchlist, addToWatched, addToFavorites};
