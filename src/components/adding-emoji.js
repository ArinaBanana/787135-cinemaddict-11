import AbstractSmartComponent from "./abstract-smart";

const createAddingEmojiTemplate = (currentEmoji) => {
  return (
    `<div for="add-emoji" class="film-details__add-emoji-label">
       ${currentEmoji ? `<img src="./images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji">` : ``}
    </div>`
  );
};

export default class AddingEmoji extends AbstractSmartComponent {
  constructor(currentEmoji) {
    super();
    this._currentEmoji = currentEmoji;
  }

  getTemplate() {
    return createAddingEmojiTemplate(this._currentEmoji);
  }

  recoveryListeners() {
    return null;
  }

  setEmoji(emoji) {
    this._currentEmoji = emoji;
    super.rerender();
  }
}
