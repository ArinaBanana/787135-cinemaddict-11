import PopupFilmDetails from "../components/popup-film-details";
import CommentsController from "./comment";
import PopupContainer from "../components/popup-container";
import MovieAdapter from "../models/movie-adapter";
import notification from "../components/notification";
import {remove, render} from "../utils/components";
import {addToWatchlist, addToWatched, addToFavorites} from "../utils/films";
import {ESC_KEY} from "../utils/constant";
import {apiWithProvider} from "../main";

export default class PopupController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._film = null;
    this._comments = {};
    this._commentsController = null;

    this._onButtonClose = this._onButtonClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._addToWatchList = this._addToWatchList.bind(this);
    this._addToWatched = this._addToWatched.bind(this);
    this._addToFavorites = this._addToFavorites.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._getFormData = this._getFormData.bind(this);
    this._onOffline = this._onOffline.bind(this);
    this._onOnline = this._onOnline.bind(this);

  }

  show() {
    const isShowed = this.getIsShowed();

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
    this._subscribeNavigator();
  }

  getIsShowed() {
    return Boolean(this._popupComponent);
  }

  setFilm(film) {
    const isSameFilm = Boolean(this._film) && film.id === this._film.id;
    const isShowed = this.getIsShowed();

    this._film = film;

    if (isShowed) {
      this._popupComponent.setFilm(this._film);
    }

    if (isShowed && isSameFilm) {
      this._commentsController.update(this._getFilmDetailsBottomContainer(), this._film.comments.length);
    } else {
      this._loadComments();
    }
  }

  _loadComments() {
    apiWithProvider.getComments(this._film.id)
      .catch(() => {
        notification.alert({type: `error`, text: `Error loading comments... Please, try again later`});
        return [];
      })
      .then((comments) => {
        this._comments = {};
        this._comments[this._film.id] = comments;
        this._initComments(comments);
      });
  }

  _subscribeNavigator() {
    window.addEventListener(`online`, this._onOnline);
    window.addEventListener(`offline`, this._onOffline);
  }

  _unsubscribeNavigator() {
    window.removeEventListener(`online`, this._onOnline);
    window.removeEventListener(`offline`, this._onOffline);
  }

  _onOffline() {
    this._commentsController.disableForm();
  }

  _onOnline() {
    this._loadComments();
  }

  _getFilmDetailsBottomContainer() {
    return this._popupComponent.getElement().querySelector(`.form-details__bottom-container`);
  }

  _initComments(comments) {
    const container = this._getFilmDetailsBottomContainer();

    if (this._commentsController) {
      this._commentsController.unsubscribe();
      this._commentsController.removeContainer();
    }

    this._commentsController = new CommentsController(container, this._onCommentsDataChange, this._getFormData, this._film.id);
    this._commentsController.init(comments, this._film.comments.length);
  }

  _getFormData() {
    return this._popupComponent.getFormData();
  }

  _onCommentsDataChange(comments) {
    const newFilm = MovieAdapter.clone(this._film);
    newFilm.comments = comments.map((comment) => comment.id);

    this._onDataChange(newFilm);
    this._commentsController.init(comments);
  }

  _removePopupComponent() {
    remove(this._popupContainer);
    this._popupContainer = null;
    this._popupComponent = null;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._commentsController.unsubscribe();
    this._unsubscribeNavigator();
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
    addToWatchlist(this._film, this._onDataChange);
  }

  _addToWatched(evt) {
    evt.preventDefault();
    addToWatched(this._film, this._onDataChange);
  }

  _addToFavorites(evt) {
    evt.preventDefault();
    addToFavorites(this._film, this._onDataChange);
  }
}
