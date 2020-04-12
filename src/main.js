import {createUserProfileTemplate} from "./components/user-profile";
import {createStatisticTemplate} from "./components/statistic";
import {createMainNavigationTemplate} from "./components/main-navigation";
import {createSortElementsTemplate} from "./components/sort-elements";
import {createFilmsFiltersTemplate} from "./components/films-filters";
import {createFilmsContainerTemplate} from "./components/films-container";
import {createFilmCardTemplate} from "./components/film-card";
import {createButtonShowMoreTemplate} from "./components/button-show-more";
import {createPopupFilmDetailsTemplate} from "./components/popup-film-details";
import {createCommentsContainerTemplate} from "./components/comments-container";
import {createCommentsTemplate} from "./components/comments";
import {createNewCommentTemplate} from "./components/new-comment";

import {generateFilms} from "./moks/film";

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const elementHeader = document.querySelector(`.header`);
const elementFooterStatistic = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, createUserProfileTemplate(), `beforeend`);
render(elementFooterStatistic, createStatisticTemplate(), `beforeend`);

render(elementMain, createMainNavigationTemplate(), `beforeend`);
render(elementMain, createSortElementsTemplate(), `beforeend`);
render(elementMain, createFilmsFiltersTemplate(), `beforeend`);

const elementFilms = elementMain.querySelector(`.films`);
const elementFilmsList = elementFilms.querySelector(`.films-list`);

const elementFilmsExtra = elementFilms.querySelectorAll(`.films-list--extra`);

elementFilmsExtra.forEach((elementFilm) => {
  render(elementFilm, createFilmsContainerTemplate(), `beforeend`);
  const container = elementFilm.querySelector(`.films-list__container`);

  for (let i = 0; i < filmsExtra.length; i++) {
    const film = filmsExtra[i];

    render(container, createFilmCardTemplate(film), `beforeend`);
  }
});

render(elementFilmsList, createFilmsContainerTemplate(), `beforeend`);
render(elementFilmsList, createButtonShowMoreTemplate(), `beforeend`);

const containerAllFilms = elementFilmsList.querySelector(`.films-list__container`);

for (let i = 0; i < films.length; i++) {
  const film = films[i];
  render(containerAllFilms, createFilmCardTemplate(film), `beforeend`);
}

render(elementMain, createPopupFilmDetailsTemplate(), `beforeend`);

const filmDetailsPopup = elementMain.querySelector(`.film-details`);
const detailsBottomContainer = filmDetailsPopup.querySelector(`.form-details__bottom-container`);

render(detailsBottomContainer, createCommentsContainerTemplate(), `beforeend`);

const commentsContainer = detailsBottomContainer.querySelector(`.film-details__comments-wrap`);

render(commentsContainer, createCommentsTemplate(), `beforeend`);
render(commentsContainer, createNewCommentTemplate(), `beforeend`);
