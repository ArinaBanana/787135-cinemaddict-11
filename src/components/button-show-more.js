import AbstractSmartComponent from "./abstract-smart";

const createButtonShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMore extends AbstractSmartComponent {
  getTemplate() {
    return createButtonShowMoreTemplate();
  }

  setShowMoreHandler(handler) {
    this._handler = handler;
    this.getElement().addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setShowMoreHandler(this._handler);
  }
}
