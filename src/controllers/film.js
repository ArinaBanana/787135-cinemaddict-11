import FilmCard from "../components/film-card";

import {remove, render, replace} from "../utils/methods-for-components";

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

    this._filmComponent.setOpenPopupHandler(this._onOpenPopup);
    this._filmComponent.setAddedToWatchlistHandler(this._addToWatchList);
    this._filmComponent.setAddedToWatchedHandler(this._addToWatched);
    this._filmComponent.setAddedToFavoriteHandler(this._addToFavorites);

    render(this._container, this._filmComponent);
  }

  getFilm() {
    return this._film;
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

    const oldFilm = this._film;
    const newFilm = Object.assign({}, oldFilm, {
      addedToWatchlist: !(oldFilm.addedToWatchlist),
    });

    this._onDataChange(newFilm);
  }

  _addToWatched(evt) {
    evt.preventDefault();

    const oldFilm = this._film;
    const newFilm = Object.assign({}, oldFilm, {
      alreadyWatched: !(oldFilm.alreadyWatched),
    });

    this._onDataChange(newFilm);
  }

  _addToFavorites(evt) {
    evt.preventDefault();

    const oldFilm = this._film;
    const newFilm = Object.assign({}, oldFilm, {
      addedToFavorite: !(oldFilm.addedToFavorite),
    });

    this._onDataChange(newFilm);
  }
}
