import MovieAdapter from "./models/movie-adapter";
import CommentAdapter from "./models/comment-adapter";

const isOnline = () => {
  return window.navigator.onLine;
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
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
          const items = createStoreStructure(movies.map((movie) => movie.toRaw()));
          this._store.setItems(items);

          return movies;
        });
    }

    const storeMovies = Object.values(this._store.getItems()).map((movie) => {
      delete movie.commentsData;
      return movie;
    });

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

  sync() {
    if (isOnline()) {
      const storeMovies = Object.values(this._store.getItems());

      this._api.sync(storeMovies).then((response) => {
        const items = createStoreStructure(response[`updated`]);

        this._store.setItems(items);
      });
    }
  }
}
