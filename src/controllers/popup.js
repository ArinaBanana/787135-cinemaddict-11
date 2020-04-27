import PopupFilmDetails from "../components/popup-film-details";
import CommentsController from "./comment";
import {remove, render} from "../utils/methods-for-components";

export default class PopupController {
  constructor(container) {
    this._container = container;
    this._film = null;

    this._onButtonClose = this._onButtonClose.bind(this);
  }

  init() {
    this._popupComponent = new PopupFilmDetails(this._film);
    render(this._container, this._popupComponent);
    this._popupComponent.setButtonCloseHandler(this._onButtonClose);
  }

  _initComments(comments) {
    const container = this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsController = new CommentsController(container)
    this._commentsController.init(comments);
  }

  _removePopupComponent() {
    remove(this._popupComponent);
    this._popupComponent = null;
  }

  _onButtonClose() {
    this._removePopupComponent();
  }

  setFilm(film) {
    this._film = film;

    if (!this._popupComponent) {
      this.init();
    }

    this._popupComponent.rerender(this._film);
    this._initComments(this._film.comments);
  }
}
