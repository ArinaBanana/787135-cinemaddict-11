import AbstractComponent from "./abstract";

const createCommentTextareaTemplate = () => {
  return (
    `<label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>`
  );
};

export default class CommentTextarea extends AbstractComponent {
  getTemplate() {
    return createCommentTextareaTemplate();
  }

  disableTextarea() {
    this._getCommentInput().setAttribute(`disabled`, `disabled`);
  }

  enableTextarea() {
    this._getCommentInput().removeAttribute(`disabled`);
  }

  setError() {
    this._getCommentInput().setAttribute(`style`, `border: 1px solid red`);
  }

  removeError() {
    this._getCommentInput().removeAttribute(`style`);
  }

  _getCommentInput() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }
}
