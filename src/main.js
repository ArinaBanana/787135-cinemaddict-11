import UserProfile from "./components/user-profile";
import Statistic from "./components/statistic";
import MainNavigation from "./components/main-navigation";
import SortElement from "./components/sort-elements";
import FilmsFilters from "./components/films-filters";

import {generateFilters} from "./moks/filters";
import {generateFilms} from "./moks/film";
import {generateComments} from "./moks/comments";
import {render} from "./utils/utils";

import {initFilmList} from "./init-film-list";
import {initPopupFilm} from "./init-film-list";

const FILMS_COUNT = 20;
// const FILMS_EXTRA_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
// const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);
const comments = generateComments();
const filters = generateFilters(films.length);

const elementHeader = document.querySelector(`.header`);
const elementFooterStatistic = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, new UserProfile().getElement());
render(elementFooterStatistic, new Statistic().getElement());
render(elementMain, new MainNavigation(filters).getElement());
render(elementMain, new SortElement().getElement());

const filmsFiltersComponent = new FilmsFilters();
render(elementMain, filmsFiltersComponent.getElement());

initFilmList(filmsFiltersComponent.getElement(), films);
initPopupFilm(elementMain, films[0], comments);
