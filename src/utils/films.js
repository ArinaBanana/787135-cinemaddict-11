import MovieAdapter from "../models/movie-adapter";
import notification from "../components/notification";
import {api} from "../api";

const updateFilm = (film, transformFilm, filmUpdateHandler) => {
  const newFilm = MovieAdapter.clone(film);
  transformFilm(film, newFilm);

  api.updateMovie(film.id, newFilm)
    .then((movie) => {
      filmUpdateHandler(movie);
    })
    .catch(() => {
      notification.alert({type: `error`, text: `Please, try again later...`});
    });
};

const addToWatchlist = (film, filmUpdateHandler) => {
  updateFilm(film, (oldFilm, newFilm) => {
    newFilm.addedToWatchlist = !oldFilm.addedToWatchlist;
  }, filmUpdateHandler);
};

const addToWatched = (film, filmUpdateHandler) => {
  updateFilm(film, (oldFilm, newFilm) => {
    newFilm.alreadyWatched = !oldFilm.alreadyWatched;
  },
  filmUpdateHandler);
};

const addToFavorites = (film, filmUpdateHandler) => {
  updateFilm(film, (oldFilm, newFilm) => {
    newFilm.addedToFavorite = !oldFilm.addedToFavorite;
  },
  filmUpdateHandler);
};

export {addToWatchlist, addToWatched, addToFavorites};
