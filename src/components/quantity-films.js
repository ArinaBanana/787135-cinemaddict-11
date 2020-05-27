import AbstractSmartComponent from "./abstract-smart";

const createQuantityFilmsTemplate = (count) => {
  return (
    `<p>${count ? count : `0`} movies inside</p>`
  );
};

export default class QuantityFilms extends AbstractSmartComponent {
  setCount(count) {
    this._count = count;
    this.rerender();
  }

  getTemplate() {
    return createQuantityFilmsTemplate(this._count);
  }

  recoveryListeners() {
    return null;
  }
}
