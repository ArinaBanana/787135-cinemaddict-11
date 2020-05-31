import AbstractSmartComponent from "./abstract-smart";

const createNewCommentTemplate = () => {
  return (
    `<div class="film-details__new-comment">

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`
  );
};

export default class NewComment extends AbstractSmartComponent {
  constructor(emoji) {
    super();
    this._emoji = emoji;

    this._currentEmojiHandler = null;
  }

  getTemplate() {
    return createNewCommentTemplate(this._emoji);
  }

  setCurrentEmojiHandler(handler) {
    this._currentEmojiHandler = handler;

    const emojiList = this._getEmojiList();

    emojiList.addEventListener(`change`, function (evt) {
      handler(evt.target.value);
    });
  }

  recoveryListeners() {
    this.setCurrentEmojiHandler(this._currentEmojiHandler);
  }

  _getEmojiList() {
    return this.getElement().querySelector(`.film-details__emoji-list`);
  }
}
