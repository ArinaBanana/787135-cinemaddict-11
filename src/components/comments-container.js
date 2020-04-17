import {createElement} from "../utils/utils";

const createCommentsContainerTemplate = (commentsLength) => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments <span class="film-details__comments-count">${commentsLength}</span>
      </h3>
      <ul class="film-details__comments-list"></ul>
    </section>`
  );
};

export default class CommentsContainer {
  constructor(commentsLength) {
    this._commentsLength = commentsLength;
    this._element = null;
  }

  getTemplate() {
    return createCommentsContainerTemplate(this._commentsLength);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
