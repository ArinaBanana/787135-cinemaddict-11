import FilmCard from "../components/film-card";
import MovieAdapter from "../models/movieAdapter";

import {remove, render} from "../utils/methods-for-components";
import {api} from "../api";

export default class FilmController {
  constructor(container, onDataChange, onClick) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onClick = onClick;

    this._film = null;
    this._filmComponent = null;

    this._onOpenPopup = this._onOpenPopup.bind(this);
    this._addToWatchList = this._addToWatchList.bind(this);
    this._addToWatched = this._addToWatched.bind(this);
    this._addToFavorites = this._addToFavorites.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmComponent = new FilmCard(this._film);

    render(this._container, this._filmComponent);

    this._filmComponent.setClickPosterHandler(this._onOpenPopup);
    this._filmComponent.setClickTitleHandler(this._onOpenPopup);
    this._filmComponent.setClickCommentHandler(this._onOpenPopup);

    this._filmComponent.setAddedToWatchlistHandler(this._addToWatchList);
    this._filmComponent.setAddedToWatchedHandler(this._addToWatched);
    this._filmComponent.setAddedToFavoriteHandler(this._addToFavorites);

    render(this._container, this._filmComponent);
  }

  setFilm(film) {
    this._film = film;
    this._filmComponent.rerender(this._film);
  }

  destroy() {
    remove(this._filmComponent);
  }

  _onOpenPopup() {
    this._onClick(this._film);
  }

  _addToWatchList(evt) {
    evt.preventDefault();

    const newFilm = MovieAdapter.clone(this._film);
    newFilm.addedToWatchlist = !newFilm.addedToWatchlist;

    api.changeDataMovie(this._film.id, newFilm).then((movie) => {
      this._onDataChange(movie);
    });
  }

  _addToWatched(evt) {
    evt.preventDefault();

    const newFilm = MovieAdapter.clone(this._film);
    newFilm.alreadyWatched = !newFilm.alreadyWatched;

    api.changeDataMovie(this._film.id, newFilm).then((movie) => {
      this._onDataChange(movie);
    });
  }

  _addToFavorites(evt) {
    evt.preventDefault();

    const newFilm = MovieAdapter.clone(this._film);
    newFilm.addedToFavorite = !newFilm.addedToFavorite;

    api.changeDataMovie(this._film.id, newFilm).then((movie) => {
      this._onDataChange(movie);
    });
  }
}
