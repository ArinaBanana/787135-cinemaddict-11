import FilmCard from "../components/film-card";
import {addToWatchlist, addToWatched, addToFavorites} from "../utils/films";
import {remove, render} from "../utils/components";

export default class FilmController {
  constructor(container, onDataChange, onClick, film) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onClick = onClick;

    this._film = film;
    this._filmComponent = new FilmCard(this._film);

    this._onOpenPopup = this._onOpenPopup.bind(this);
    this._addToWatchList = this._addToWatchList.bind(this);
    this._addToWatched = this._addToWatched.bind(this);
    this._addToFavorites = this._addToFavorites.bind(this);

    this._filmComponent.setClickPosterHandler(this._onOpenPopup);
    this._filmComponent.setClickTitleHandler(this._onOpenPopup);
    this._filmComponent.setClickCommentHandler(this._onOpenPopup);

    this._filmComponent.setAddedToWatchlistHandler(this._addToWatchList);
    this._filmComponent.setAddedToWatchedHandler(this._addToWatched);
    this._filmComponent.setAddedToFavoriteHandler(this._addToFavorites);
  }

  init() {
    render(this._container, this._filmComponent);
  }

  destroy() {
    remove(this._filmComponent);
  }

  _onOpenPopup() {
    this._onClick(this._film);
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
