import AbstractSmartComponent from "./abstract-smart";
import {convertDuration} from "../utils/convert-duration";

import moment from "moment";

const createPopupFilmDetailsTemplate = (film) => {
  const {
    title,
    originalTitle,
    poster,
    description,
    rating,
    duration,
    genres,
    creators,
    ageRating,
    addedToWatchlist,
    alreadyWatched,
    addedToFavorite,
    releaseDate,
  } = film;

  const convertDate = moment(releaseDate).format(`D MMMM YYYY`);

  return (
    `<form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster.url}" alt="${title}">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${creators.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${creators.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${creators.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${convertDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${convertDuration(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${creators.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genres[0]}</span>
                  <span class="film-details__genre">${genres[1]}</span>
                  <span class="film-details__genre">${genres[2]}</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${addedToWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">
            Add to watchlist
          </label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">
            Already watched
          </label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${addedToFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">
            Add to favorites
          </label>
        </section>
      </div>

      <div class="form-details__bottom-container"></div>
      </form>`
  );
};

export default class PopupFilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._buttonCloseHandler = null;
  }

  getTemplate() {
    return createPopupFilmDetailsTemplate(this._film);
  }

  setButtonCloseHandler(handler) {
    this._buttonCloseHandler = handler;

    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setAddToWatchListHandler(handler) {
    this._addToWatchListHandler = handler;

    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setAddToWatchedHandler(handler) {
    this._addToWatchedHandler = handler;

    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setAddToFavoriteHandler(handler) {
    this._addToFavoriteHandler = handler;

    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  getFormData() {
    const form = this.getElement();
    return new FormData(form);
  }

  rerender(film) {
    this._film = film;
    super.rerender();
  }

  recoveryListeners() {
    this.setButtonCloseHandler(this._buttonCloseHandler);

    this.setAddToWatchListHandler(this._addToWatchListHandler);
    this.setAddToWatchedHandler(this._addToWatchedHandler);
    this.setAddToFavoriteHandler(this._addToFavoriteHandler);
  }
}
