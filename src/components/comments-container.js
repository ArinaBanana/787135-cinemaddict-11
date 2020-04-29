import AbstractComponent from "./abstract";

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

export default class CommentsContainer extends AbstractComponent {
  constructor(commentsLength) {
    super();
    this._commentsLength = commentsLength;
  }

  getTemplate() {
    return createCommentsContainerTemplate(this._commentsLength);
  }

  getListComments() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }
}
