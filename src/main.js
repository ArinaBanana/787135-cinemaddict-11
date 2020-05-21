import UserProfile from "./components/user-profile";
import QuantityFilms from "./components/quantity-films";
import SectionFilms from "./components/section-films";
import FilmsAllList from "./components/films-all-list";

import MainNavigationController, {MenuItems} from "./controllers/main-navigation";
import SortController from "./controllers/sort";
import StatisticController from "./controllers/statistic";
import FilmListController from "./controllers/film-list";
import MoviesModel from "./models/movies";

import {generateFilms} from "./moks/film";
import {render} from "./utils/methods-for-components";
import {getUserGrade} from "./utils/utils";

const FILMS_COUNT = 20;
// const FILMS_EXTRA_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);
const watchedFilms = films.filter((film) => film.alreadyWatched);

// const filmsExtra = generateFilms(FILMS_EXTRA_COUNT);

const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const grade = getUserGrade(watchedFilms);
const user = new UserProfile(grade);
render(elementHeader, user);
render(elementFooter, new QuantityFilms(films.length));

const mainNavigationController = new MainNavigationController(elementMain, moviesModel);
mainNavigationController.init();

const sortController = new SortController(elementMain, moviesModel);
sortController.init();

const sectionFilmsComponent = new SectionFilms();
render(elementMain, sectionFilmsComponent);

const filmsAllListComponent = new FilmsAllList();
render(sectionFilmsComponent.getElement(), filmsAllListComponent);

const mainFilmList = new FilmListController(filmsAllListComponent, moviesModel);
mainFilmList.init();

const statisticController = new StatisticController(elementMain, watchedFilms, grade);
statisticController.init();

mainNavigationController.setChangeScreenHandler((menuItem) => {
  switch (menuItem) {
    case MenuItems.STATS:
      sortController.hide();
      filmsAllListComponent.hide();
      statisticController.show();
      break;
    default:
      sortController.show();
      filmsAllListComponent.show();
      statisticController.hide();
      break;
  }
});
