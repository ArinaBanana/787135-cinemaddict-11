import UserProfile from "./components/user-profile";
import Statistic from "./components/statistic";
import SortElement from "./components/sort-elements";
import FilmsFilters from "./components/films-filters";

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
filtersController.init(filters);

render(elementMain, new SortElement());

const filmsFiltersComponent = new FilmsFilters();
render(elementMain, filmsFiltersComponent);

const filmList = new FilmListController(filmsFiltersComponent, filmsModel);
filmList.init();
