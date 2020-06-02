import MovieAdapter from "../models/movie-adapter";
import CommentAdapter from "../models/comment-adapter";
import {isOnline} from "../utils/utils";
import Store from "./store";
import {STORE_NAME} from "../utils/constant";
import {api as mainApi} from "./api";

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

    const comments = movie && movie.commentsData;
    return Promise.resolve()
      .then(() => {
        return CommentAdapter.parseComments(comments);
      });
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

  createComment(filmId, data) {
    return this._api.createComment(filmId, data)
      .then((response) => {
        const {movie, comments} = response;
        this._store.setItem(filmId, Object.assign(movie, {
          commentsData: comments,
          comments: comments.map((comment) => comment.id)
        }));
        return response;
      });
  }

  deleteComment(filmId, id) {
    return this._api.deleteComment(id)
      .then(() => {
        const items = this._store.getItems();
        const movie = items[filmId];
        const comments = movie.comments.filter((commentId) => commentId !== id);
        const newData = {
          comments
        };
        if (movie.commentsData) {
          newData.commentsData = movie.commentsData.filter((comment) => comment.id !== id);
        }
        this._store.setItem(filmId, Object.assign(movie, newData));
        return comments;
      });
  }

  sync() {
    const storeMovies = Object.values(this._store.getItems());

    return this._api.sync(storeMovies).then((response) => {
      const items = createStoreStructure(response[`updated`]);

      this._store.setItems(items);
      return MovieAdapter.parseMovies(response[`updated`]);
    });
  }
}

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(mainApi, store);

export {apiWithProvider};
