import CommentsContainer from "../components/comments-container";
import Comment from "../components/comment";
import NewComment from "../components/new-comment";

import {render} from "../utils/methods-for-components";

export default class CommentsController {
  constructor(container, onCommentsDataChange) {
    this._container = container;
    this._comments = null;

    this._onCommentsDataChange = onCommentsDataChange;

    this._commentComponents = null;
    this._newCommentComponent = null;

    this._onChangeEmoji = this._onChangeEmoji.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  init(comments) {
    this._comments = comments;
    this._commentsContainer = new CommentsContainer(comments.length);

    render(this._container, this._commentsContainer);

    this._commentComponents = this._comments.map((comment) => new Comment(comment));
    this._commentComponents.forEach((commentComponent) => render(this._commentsContainer.getListComments(), commentComponent));

    this._commentComponents.forEach((component) => component.setButtonDeleteHandler(this._onDelete));

    this._currentEmoji = null;

    this._newCommentComponent = new NewComment(this._currentEmoji);
    this._newCommentComponent.setCurrentEmojiHandler(this._onChangeEmoji);

    render(this._commentsContainer.getElement(), this._newCommentComponent);
  }

  setContainer(container) {
    this._container = container;
    render(this._container, this._commentsContainer);
  }

  setComments(comments) {
    this._comments = comments;
    this._commentComponents.forEach((component, index) => component.rerender(this._comments[index]));
  }

  _onChangeEmoji(emoji) {
    this._currentEmoji = emoji;
    this._newCommentComponent.rerender(this._currentEmoji);
  }

  _onDelete(deletedComment) {
    const index = this._comments.findIndex((comment) => comment === deletedComment);
    const newComments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._onCommentsDataChange(newComments);
  }
}
