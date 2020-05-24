import PopupFilmDetails from "../components/popup-film-details";
import CommentsController from "./comment";
import PopupContainer from "../components/popup-container";
import {remove, render} from "../utils/methods-for-components";
import {ESC_KEY} from "../utils/utils";
import {api} from "../api";

export default class PopupController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._film = null;
    this._commentsController = null;

    this._onButtonClose = this._onButtonClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._addToWatchList = this._addToWatchList.bind(this);
    this._addToWatched = this._addToWatched.bind(this);
    this._addToFavorites = this._addToFavorites.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._getFormData = this._getFormData.bind(this);
  }

  show() {
    const isShowed = Boolean(this._popupContainer);
    if (isShowed) {
      return;
    }

    this._popupContainer = new PopupContainer();
    render(this._container, this._popupContainer);

    this._popupComponent = new PopupFilmDetails(this._film);
    render(this._popupContainer.getElement(), this._popupComponent);


    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._popupComponent.setButtonCloseHandler(this._onButtonClose);
    this._popupComponent.setAddToWatchListHandler(this._addToWatchList);
    this._popupComponent.setAddToWatchedHandler(this._addToWatched);
    this._popupComponent.setAddToFavoriteHandler(this._addToFavorites);

    api.getComments(this._film.id)
      .then((comments) => {
        this._initComments(comments);
      });
  }

  setFilm(film) {
    this._film = film;

    const isShowed = Boolean(this._popupComponent);

    if (isShowed) {
      this._popupComponent.rerender(this._film);
      this._initComments(this._film.comments);
    }
  }

  _initComments(comments) {
    const container = this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);

    if (this._commentsController) {
      this._commentsController.destroyListeners();
    }
    this._commentsController = new CommentsController(container, this._onCommentsDataChange, this._getFormData);
    this._commentsController.init(comments);
  }

  _getFormData() {
    return this._popupComponent.getFormData();
  }

  _onCommentsDataChange(comments) {
    const newFilm = Object.assign({}, this._film, {comments});
    this._onDataChange(newFilm);
  }

  _removePopupComponent() {
    remove(this._popupContainer);
    this._popupContainer = null;
    this._popupComponent = null;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onButtonClose() {
    this._removePopupComponent();
  }

  _onEscKeyDown(evt) {
    if (evt.key === ESC_KEY) {
      this._removePopupComponent();
    }
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
