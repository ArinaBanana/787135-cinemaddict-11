import AbstractSmartComponent from "./abstract-smart";
import {getEmojiUrlByName, TitlesForButton} from "../utils/utils";
import moment from "moment";

const getFormattingDate = (timestamp) => {
  const date = moment(timestamp);

  const now = moment().startOf(`day`);
  const diff = now.diff(date, `days`);

  if (diff > 3) {
    return date.format(`YYYY/MM/DD HH:mm`);
  }

  return date.fromNow();
};

const createCommentTemplate = (comment, titleForButtonDelete) => {
  const {
    emoji,
    author,
    date,
    message,
  } = comment;

  const urlEmoji = getEmojiUrlByName(emoji);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${urlEmoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getFormattingDate(date)}</span>
          <button class="film-details__comment-delete">${titleForButtonDelete}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
    this._titleForButtonDelete = TitlesForButton.DELETE;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._titleForButtonDelete);
  }

  setButtonDeleteHandler(handler) {
    this._handler = handler;

    this.getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        handler(this._comment);
      });
  }

  setIsLoading(isLoading) {
    this._titleForButtonDelete = isLoading ? TitlesForButton.DELETING : TitlesForButton.DELETE;
    super.rerender();
  }

  disableRemoveButton() {
    this.getElement()
      .querySelector(`.film-details__comment-delete`)
      .setAttribute(`disabled`, `disabled`);
  }

  enableRemoveButton() {
    this.getElement()
      .querySelector(`.film-details__comment-delete`)
      .removeAttribute(`disabled`);
  }

  recoveryListeners() {
    this.setButtonDeleteHandler(this._handler);
  }
}
