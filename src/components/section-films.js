import AbstractComponent from "./abstract";

const createSectionFilmsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class SectionFilms extends AbstractComponent {
  getTemplate() {
    return createSectionFilmsTemplate();
  }
}
