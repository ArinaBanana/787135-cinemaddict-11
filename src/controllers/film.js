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
  }

  init(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCard(this._film);

    render(this._container, this._filmComponent);

    this._filmComponent.setOpenPopupHandler(this._onOpenPopup);

    this._filmComponent.setAddedToWatchlistHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, oldFilm, {
        addedToWatchlist: !(oldFilm.addedToWatchlist),
      });

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmComponent.setAddedToWatchedHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, oldFilm, {
        alreadyWatched: !(oldFilm.alreadyWatched),
      });

      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmComponent.setAddedToFavoriteHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, oldFilm, {
        addedToFavorite: !(oldFilm.addedToFavorite),
      });

      this._onDataChange(this, oldFilm, newFilm);
    });

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
}
