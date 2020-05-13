import UserProfile from "./components/user-profile";
import Statistic from "./components/statistic";
import SortElement from "./components/sort-elements";
import SectionFilms from "./components/section-films";
import FilmsAllList from "./components/films-all-list";

import FilmListController from "./controllers/film-list";
import MainNavFiltersController from "./controllers/main-nav-filters";
import MoviesModel from "./models/movies";

import {generateFilms} from "./moks/film";
import {render} from "./utils/methods-for-components";

const FILMS_COUNT = 20;
// const FILMS_EXTRA_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const filmsModel = new MoviesModel();
filmsModel.setMovies(films);

// const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);

const elementHeader = document.querySelector(`.header`);
const elementFooterStatistic = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, new UserProfile());
render(elementFooterStatistic, new Statistic());

const filtersController = new MainNavFiltersController(elementMain, filmsModel);
filtersController.init();

render(elementMain, new SortElement());

const sectionFilmsComponent = new SectionFilms();
render(elementMain, sectionFilmsComponent);

const filmsAllListComponent = new FilmsAllList();
render(sectionFilmsComponent.getElement(), filmsAllListComponent);

const mainFilmList = new FilmListController(filmsAllListComponent, filmsModel);
mainFilmList.init();
