import FilmCard from "../components/film-card";
import PopupFilmDetails from "../components/popup-film-details";
import CommentsController from "./comment";

import {remove, render} from "../utils/methods-for-components";

const BODY_ELEMENT = document.querySelector(`body`);

export default class FilmController {
  constructor(container) {
    this._container = container;
    this._film = null;
    this._filmComponent = null;
    this._popupComponent = null;

    this._onOpenPopup = this._onOpenPopup.bind(this);
    this._onButtonClose = this._onButtonClose.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmComponent = new FilmCard(this._film);
    this._popupComponent = new PopupFilmDetails(this._film);

    render(this._container, this._filmComponent);

    this._filmComponent.setOpenPopupHandler(this._onOpenPopup);
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
