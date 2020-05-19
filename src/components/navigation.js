import AbstractComponent from "./abstract";

const createMainNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional" data-stats="Stats">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createMainNavigationTemplate();
  }

  setSwitchScreenHandler(handler) {
    this.getElement()
      .querySelector(`.main-navigation__additional`)
      .addEventListener(`click`, (evt) => {
        handler(evt.target.dataset.stats);
      });
  }
}
