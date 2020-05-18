import AbstractComponent from "./abstract";

const createQuantityFilmsTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class QuantityFilms extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createQuantityFilmsTemplate(this._count);
  }
}
