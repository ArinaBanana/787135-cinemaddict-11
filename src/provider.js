import MovieAdapter from "./models/movie-adapter";
import CommentAdapter from "./models/comment-adapter";

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
          movies.forEach((movie) => this._store.setItems(`movie:${movie.id}`, movie.toRaw()));

          return movies;
        });
    }

    const items = this._store.getItems();

    const storeMovies = Object.keys(items).reduce((acc, key) => {
      if (key.indexOf(`movie`) === 0) {
        acc.push(items[key]);
      }

      return acc;
    }, []);

    return Promise.resolve(MovieAdapter.parseMovies(storeMovies));
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          this._store.setItems(`comments:${filmId}`, comments.map((comment) => comment.toRaw()));
          return comments;
        });
    }

    const items = this._store.getItems();

    const commentsKey = Object.keys(items).find((key) => key === `comments:${filmId}`);
    const comments = items[commentsKey] || [];

    return Promise.resolve(CommentAdapter.parseComments(comments));
  }

  updateMovie(id, data) {
    if (isOnline) {
      return this._api.updateMovie(id, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }
}
