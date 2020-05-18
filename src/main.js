import UserProfile from "./components/user-profile";
import QuantityFilms from "./components/quantity-films";
import SectionFilms from "./components/section-films";
import FilmsAllList from "./components/films-all-list";
import Statistic from "./components/statistic";

import FilmListController from "./controllers/film-list";
import MainNavFiltersController from "./controllers/main-nav-filters";
import SortController from "./controllers/sort";
import MoviesModel from "./models/movies";

import {generateFilms} from "./moks/film";
import {render} from "./utils/methods-for-components";
import {MenuItems} from "./components/main-navigation";

const FILMS_COUNT = 20;
// const FILMS_EXTRA_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const filmsModel = new MoviesModel();
filmsModel.setMovies(films);

// const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);

const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

render(elementHeader, new UserProfile());
render(elementFooter, new QuantityFilms(films.length));

const filtersController = new MainNavFiltersController(elementMain, filmsModel);
filtersController.init();

const sortController = new SortController(elementMain, filmsModel);
sortController.init();

const sectionFilmsComponent = new SectionFilms();
render(elementMain, sectionFilmsComponent);

const filmsAllListComponent = new FilmsAllList();
render(sectionFilmsComponent.getElement(), filmsAllListComponent);

const mainFilmList = new FilmListController(filmsAllListComponent, filmsModel);
mainFilmList.init();

const statisticComponent = new Statistic();
render(elementMain, statisticComponent);
statisticComponent.hide();

filtersController.setSwitchInComponent((menuItem) => {
  switch (menuItem) {
    case MenuItems.STATS:
      sortController.hide();
      filmsAllListComponent.hide();
      statisticComponent.show();
      break;
  }
});
