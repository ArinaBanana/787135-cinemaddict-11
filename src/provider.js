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
          const items = movies.reduce((acc, movie) => {
            return Object.assign({}, acc, {
              [movie.id]: movie.toRaw()
            });
          }, {});

          this._store.setItems(items);

          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(MovieAdapter.parseMovies(storeMovies));
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          const items = this._store.getItems();
          const movie = items[filmId];
          this._store.setItem(filmId, Object.assign(movie, {commentsData: comments.map((comment) => comment.toRaw())}));
          return comments;
        });
    }

    const items = this._store.getItems();
    const movie = items[filmId];

    const comments = (movie && movie.commentsData) || [];
    return Promise.resolve(CommentAdapter.parseComments(comments));
  }

  updateMovie(id, data) {
    if (isOnline()) {
      return this._api.updateMovie(id, data)
        .then((newMovie) => {
          this._store.setItem(newMovie.id, newMovie.toRaw());
          return newMovie;
        });
    }

    const localMovie = MovieAdapter.clone(Object.assign(data, {id}));

    this._store.setItem(id, localMovie.toRaw());

    return Promise.resolve(localMovie);
  }
}
