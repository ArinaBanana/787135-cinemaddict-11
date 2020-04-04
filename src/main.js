import {createUserRankTemplate} from "./components/user-profile";
import {createStatisticTemplate} from "./components/statistic";
import {createMainNavigationTemplate} from "./components/main-nav";
import {createSortElementsTemplate} from "./components/sorting";
import {createFilmsTemplate} from "./components/films";
import {createFilmsContainerTemplate} from "./components/films-container";
import {createCardFilmTemplate} from "./components/film-card";
import {createButtonShowMoreFilmsTemplate} from "./components/button-show";

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const elementHeader = document.querySelector(`.header`);
const elementFooterStatistic = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, createUserRankTemplate(), `beforeend`);
render(elementFooterStatistic, createStatisticTemplate(), `beforeend`);

render(elementMain, createMainNavigationTemplate(), `beforeend`);
render(elementMain, createSortElementsTemplate(), `beforeend`);
render(elementMain, createFilmsTemplate(), `beforeend`);

const elementFilms = elementMain.querySelector(`.films`);
const elementFilmsList = elementFilms.querySelector(`.films-list`);

const elementFilmsExtra = elementFilms.querySelectorAll(`.films-list--extra`);

elementFilmsExtra.forEach((elementFilm) => {
  render(elementFilm, createFilmsContainerTemplate(), `beforeend`);
  const container = elementFilm.querySelector(`.films-list__container`);

  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(container, createCardFilmTemplate(), `beforeend`);
  }
});

render(elementFilmsList, createFilmsContainerTemplate(), `beforeend`);
render(elementFilmsList, createButtonShowMoreFilmsTemplate(), `beforeend`);

const containerAllFilms = elementFilmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(containerAllFilms, createCardFilmTemplate(), `beforeend`);
}


