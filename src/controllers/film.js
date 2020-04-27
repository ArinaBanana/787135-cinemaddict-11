import FilmCard from "../components/film-card";
import PopupFilmDetails from "../components/popup-film-details";
import CommentsController from "./comment";

import {remove, render, replace} from "../utils/methods-for-components";

const BODY_ELEMENT = document.querySelector(`body`);

export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._film = null;
    this._filmComponent = null;
    this._popupComponent = null;

    this._onOpenPopup = this._onOpenPopup.bind(this);
    this._onButtonClose = this._onButtonClose.bind(this);
  }

  init(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmCard(this._film);
    this._popupComponent = new PopupFilmDetails(this._film);

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

  _onOpenPopup() {
    this._initPopupFilm(BODY_ELEMENT, this._film, this._film.comments);
  }

  _onButtonClose() {
    remove(this._popupComponent);
  }

  _initPopupFilm(container, film, comments) {
    render(container, this._popupComponent);

    const bottomContainer = this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._initComments(bottomContainer, comments);

    this._popupComponent.setButtonCloseHandler(this._onButtonClose);
  }

  _initComments(container, comments) {
    new CommentsController(container).init(comments);
  }
}
