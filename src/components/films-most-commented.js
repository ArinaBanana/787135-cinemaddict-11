import AbstractComponent from "./abstract";

const createFilmsMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

export default class FilmsMostCommented extends AbstractComponent {
  getTemplate() {
    return createFilmsMostCommentedTemplate();
  }
}
