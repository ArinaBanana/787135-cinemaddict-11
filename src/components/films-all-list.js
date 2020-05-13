import AbstractComponent from "./abstract";

const createFilmsAllListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class FilmsAllList extends AbstractComponent {
  getTemplate() {
    return createFilmsAllListTemplate();
  }
}
