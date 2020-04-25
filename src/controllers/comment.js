import CommentsContainer from "../components/comments-container";
import Comment from "../components/comment";
import NewComment from "../components/new-comment";

import {render} from "../utils/methods-for-components";

export default class CommentsController {
  constructor(container) {
    this._container = container;
    this._comments = null;

    this._commentComponents = null;
    this._newCommentComponent = null;
  }

  init(comments) {
    this._comments = comments;
    this._commentsContainer = new CommentsContainer(comments.length);

    render(this._container, this._commentsContainer);

    const commentList = this._commentsContainer.getElement().querySelector(`.film-details__comments-list`);

    this._commentComponents = this._comments.map((comment) => new Comment(comment));
    this._commentComponents.forEach((commentComponent) => render(commentList, commentComponent));

    this._newCommentComponent = new NewComment();
    render(this._commentsContainer.getElement(), this._newCommentComponent);
  }
}
