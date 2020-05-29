import AbstractSmartComponent from "./abstract-smart";
import {convertDuration} from "../utils/convert-duration";

import moment from "moment";

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    description,
    rating,
    duration,
    genres,
    comments,
    releaseDate,
    addedToWatchlist,
    alreadyWatched,
    addedToFavorite,
  } = film;

  const year = moment(releaseDate).year();
  const isNotGenre = (genres.length === 0);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${convertDuration(duration)}</span>
        ${isNotGenre ? `` : `<span class="film-card__genre">${genres[0]}</span>`}
      </p>
      <img src="${poster.url}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addedToWatchlist ? `film-card__controls-item--active` : ``}">
          Add to watchlist
        </button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}">
          Mark as watched
        </button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${addedToFavorite ? `film-card__controls-item--active` : ``}">
          Mark as favorite
        </button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOpenPopupHandler(handler) {
    this._openPopupHandler = handler;

    this.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setAddedToWatchlistHandler(handler) {
    this._handleAddToWathcList = handler;

    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setAddedToWatchedHandler(handler) {
    this._handleAddToWatched = handler;

    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setAddedToFavoriteHandler(handler) {
    this._handleAddToFavorites = handler;

    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setOpenPopupHandler(this._openPopupHandler);

    this.setAddedToWatchlistHandler(this._handleAddToWathcList);
    this.setAddedToWatchedHandler(this._handleAddToWatched);
    this.setAddedToFavoriteHandler(this._handleAddToFavorites);
  }

  rerender(film) {
    this._film = film;
    super.rerender();
  }
}
