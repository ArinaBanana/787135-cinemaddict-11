import UserProfile from "./components/user-profile";
import Statistic from "./components/statistic";
import MainNavigation from "./components/main-navigation";
import SortElement from "./components/sort-elements";
import FilmsFilters from "./components/films-filters";

import {generateFilters} from "./moks/filters";
import {generateFilms} from "./moks/film";
import {render} from "./utils/methods-for-components";
import FilmListController from "./init/init-film-list";

const FILMS_COUNT = 20;
// const FILMS_EXTRA_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
// const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);
const filters = generateFilters(films.length);

const elementHeader = document.querySelector(`.header`);
const elementFooterStatistic = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, new UserProfile());
render(elementFooterStatistic, new Statistic());
render(elementMain, new MainNavigation(filters));
render(elementMain, new SortElement());

const filmsFiltersComponent = new FilmsFilters();
render(elementMain, filmsFiltersComponent);

const filmList = new FilmListController(filmsFiltersComponent);
filmList.init(films);
