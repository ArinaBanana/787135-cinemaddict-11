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

  setDisabledAttribute() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .setAttribute(`disabled`, `disabled`);
  }

  setRedBorder() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .setAttribute(`style`, `border: 1px solid red`);
  }

  removeDisabledAttribute() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .removeAttribute(`disabled`);
  }

  removeRedBorder() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .removeAttribute(`style`);
  }
}
