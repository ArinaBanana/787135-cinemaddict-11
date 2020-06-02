import MovieAdapter from "./models/movie-adapter";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItems(movie.id, movie.toRaw()));

          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(MovieAdapter.parseMovies(storeMovies));
  }

  getComments(filmId) {
    if (isOnline) {
      this._api.getComments(filmId);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updateMovie(id, data) {
    if (isOnline) {
      this._api.updateMovie(id, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
