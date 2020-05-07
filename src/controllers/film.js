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
    const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCard(this._film);

    render(this._container, this._filmComponent);

    this._filmComponent.setOpenPopupHandler(this._onOpenPopup);
    this._filmComponent.setAddedToWatchlistHandler(this._addToWatchList);
    this._filmComponent.setAddedToWatchedHandler(this._addToWatched);
    this._filmComponent.setAddedToFavoriteHandler(this._addToFavorites);

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent);
    }
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

    this._onDataChange(this, oldFilm, newFilm);
  }

  _addToWatched(evt) {
    evt.preventDefault();

    const oldFilm = this._film;
    const newFilm = Object.assign({}, oldFilm, {
      alreadyWatched: !(oldFilm.alreadyWatched),
    });

    this._onDataChange(this, oldFilm, newFilm);
  }

  _addToFavorites(evt) {
    evt.preventDefault();

    const oldFilm = this._film;
    const newFilm = Object.assign({}, oldFilm, {
      addedToFavorite: !(oldFilm.addedToFavorite),
    });

    this._onDataChange(this, oldFilm, newFilm);
  }
}
