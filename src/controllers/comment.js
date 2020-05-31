import CommentsContainer from "../components/comments-container";
import Comment from "../components/comment";
import NewComment from "../components/new-comment";
import AddingEmoji from "../components/adding-emoji";
import CommentTextarea from "../components/comment-textarea";
import CommentAdapter from "../models/commentAdapter";

import {remove, render, shake} from "../utils/methods-for-components";
import {RenderPosition} from "../utils/utils";
import {ENTER_KEY, COMMENT_FORM_FIELDS} from "../utils/constant";
import {api} from "../api";

import {encode} from "he";

const createComment = (emotion, author, date, comment) => {
  return new CommentAdapter({emotion, author, date, comment});
};

export default class CommentsController {
  constructor(container, onCommentsDataChange, getFormData, filmId) {
    this._container = container;
    this._comments = null;
    this._filmId = filmId;

    this._onCommentsDataChange = onCommentsDataChange;
    this._getFormData = getFormData;

    this._commentComponents = null;
    this._newCommentComponent = null;

    this._onChangeEmoji = this._onChangeEmoji.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._subscribeHandler = this._subscribeHandler.bind(this);
  }

  init(comments) {
    if (comments) {
      this._comments = comments;
    }

    if (this._commentsContainer) {
      remove(this._commentsContainer);
    }

    this._commentsContainer = new CommentsContainer(this._comments.length);
    render(this._container, this._commentsContainer);

    this._commentComponents = this._comments.map((comment) => new Comment(comment, `Delete`));
    this._commentComponents.forEach((commentComponent) => render(this._commentsContainer.getListComments(), commentComponent));
    this._commentComponents.forEach((component) => component.setButtonDeleteHandler(this._onDelete));

    this._initCreatingComment();
    this._subscribeCmdEnterPress();
  }

  update(container, comments) {
    this._container = container;
    this.init(comments);
  }

  destroyListeners() {
    document.removeEventListener(`keydown`, this._subscribeHandler);
  }

  _initCreatingComment() {
    this._currentEmoji = null;

    this._newCommentComponent = new NewComment(this._currentEmoji);
    this._newCommentComponent.setCurrentEmojiHandler(this._onChangeEmoji);

    this._addingEmoji = new AddingEmoji(this._currentEmoji);
    render(this._newCommentComponent.getElement(), this._addingEmoji, RenderPosition.AFTERBEGIN);

    this._textarea = new CommentTextarea();
    render(this._newCommentComponent.getElement(), this._textarea);

    render(this._commentsContainer.getElement(), this._newCommentComponent);
  }

  _onChangeEmoji(emoji) {
    this._currentEmoji = emoji;
    this._addingEmoji.setEmoji(this._currentEmoji);
  }

  _onDelete(deletedComment) {
    const index = this._comments.findIndex((comment) => comment === deletedComment);

    this._commentComponents[index].setTitleForDeleteButton(`Deleting...`);
    this._commentComponents[index].setAttributeDisabledForButton();

    api.deleteComment(deletedComment.id)
      .then(() => {
        const newComments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

        this._onCommentsDataChange(newComments);
      })
      .catch(() => {
        this._commentComponents[index].setTitleForDeleteButton(`Delete`);
        this._commentComponents[index].removeAttributeDisabledForButton();
        shake(this._commentComponents[index]);
      });
  }

  _onFormSubmit(formData) {
    const data = {};
    for (let [field, value] of formData.entries()) {
      if (COMMENT_FORM_FIELDS.includes(field)) {
        data[field] = value;
      }
    }

    const sanitizedText = encode(data.comment);

    const newComment = createComment(this._currentEmoji, null, new Date(), sanitizedText);
    const newData = CommentAdapter.clone(newComment);

    this._textarea.setDisabledAttribute();
    this._textarea.removeRedBorder();

    api.createComment(this._filmId, newData)
      .then((response) => {
        const comments = CommentAdapter.parseComments(response.comments);
        this._onCommentsDataChange(comments);
      })
      .then(() => {
        this._textarea.removeDisabledAttribute();
      })
      .catch(() => {
        shake(this._newCommentComponent);
        this._textarea.setRedBorder();
        this._textarea.removeDisabledAttribute();
      });
  }

  _subscribeCmdEnterPress() {
    document.addEventListener(`keydown`, this._subscribeHandler);
  }

  _subscribeHandler(evt) {
    if (evt.code === ENTER_KEY && evt.metaKey) {
      evt.preventDefault();
      this._onFormSubmit(this._getFormData());
    }
  }
}
