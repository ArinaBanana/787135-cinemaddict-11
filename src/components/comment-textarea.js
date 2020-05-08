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
}
