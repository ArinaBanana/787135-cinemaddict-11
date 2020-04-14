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
import {generateFilters} from "./moks/filters";

import {generateFilms} from "./moks/film";
import {generateComments} from "./moks/comments";

const FILMS_COUNT = 20;
const FILMS_EXTRA_COUNT = 2;

const SHOWING_FILMS_COUNT = 5;

const films = generateFilms(FILMS_COUNT);
const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);

const comments = generateComments();

const filters = generateFilters(films.length);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const elementHeader = document.querySelector(`.header`);
const elementFooterStatistic = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, createUserProfileTemplate(), `beforeend`);
render(elementFooterStatistic, createStatisticTemplate(), `beforeend`);

render(elementMain, createMainNavigationTemplate(filters), `beforeend`);
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

let showingCountFilms = SHOWING_FILMS_COUNT;

for (let i = 0; i < showingCountFilms; i++) {
  const film = films[i];
  render(containerAllFilms, createFilmCardTemplate(film), `beforeend`);
}

const buttonShowFilms = elementFilmsList.querySelector(`.films-list__show-more`);

buttonShowFilms.addEventListener(`click`, () => {
  const prevCount = showingCountFilms;
  showingCountFilms += SHOWING_FILMS_COUNT;

  films
    .slice(prevCount, showingCountFilms)
    .forEach((film) => render(containerAllFilms, createFilmCardTemplate(film), `beforeend`));

  if (showingCountFilms === films.length) {
    buttonShowFilms.remove();
  }
});

// рендерим окно с подробным описанием фильма
render(elementMain, createPopupFilmDetailsTemplate(films[0]), `beforeend`);

const filmDetailsPopup = elementMain.querySelector(`.film-details`);
const detailsBottomContainer = filmDetailsPopup.querySelector(`.form-details__bottom-container`);

render(detailsBottomContainer, createCommentsContainerTemplate(comments.length), `beforeend`);

const commentsWrap = detailsBottomContainer.querySelector(`.film-details__comments-wrap`);
const commentsList = detailsBottomContainer.querySelector(`.film-details__comments-list`);

for (let i = 0; i < comments.length; i++) {
  render(commentsList, createCommentsTemplate(comments[i]), `beforeend`);
}

render(commentsWrap, createNewCommentTemplate(), `beforeend`);
