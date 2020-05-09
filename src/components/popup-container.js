import AbstractComponent from "./abstract";

const createPopupContainerTemplate = () => {
  return (
    `<section class="film-details"></section>`
  );
};

export default class PopupContainer extends AbstractComponent {
  getTemplate() {
    return createPopupContainerTemplate();
  }
}
