import AbstractSmartComponent from "./abstract-smart";
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

const createCommentTemplate = (comment) => {
  const {
    emoji,
    author,
    date,
    message,
  } = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getFormattingDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  setButtonDeleteHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, () => handler(this._comment));
  }

  rerender(comment) {
    this._comment = comment;
    super.rerender();
  }

  recoveryListeners() {
    return null;
  }
}
