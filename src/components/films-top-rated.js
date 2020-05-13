import AbstractComponent from "./abstract";

const createFilmsTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>`
  );
};

export default class FilmsTopRated extends AbstractComponent {
  getTemplate() {
    return createFilmsTopRatedTemplate();
  }
}
