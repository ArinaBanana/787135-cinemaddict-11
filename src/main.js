import UserProfile from "./components/user-profile";
import QuantityFilms from "./components/quantity-films";
import SectionFilms from "./components/section-films";
import FilmsAllList from "./components/films-all-list";
import MainNavigationController, {MenuItems} from "./controllers/main-navigation";
import SortController from "./controllers/sort";
import StatisticController from "./controllers/statistic";
import FilmListController from "./controllers/film-list";
import MoviesModel from "./models/movies";
import API from "./api";
import {render} from "./utils/methods-for-components";
import {getUserGrade} from "./utils/utils";

const AUTHORIZATION = `Basic hrguy43grgh`;
const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const api = new API(AUTHORIZATION);
const mainNavigationController = new MainNavigationController(elementMain, moviesModel);
const sortController = new SortController(elementMain, moviesModel);
const sectionFilmsComponent = new SectionFilms();
const filmsAllListComponent = new FilmsAllList();
const mainFilmList = new FilmListController(filmsAllListComponent, moviesModel);

const grade = getUserGrade(moviesModel);
const user = new UserProfile(grade);

const statisticController = new StatisticController(elementMain, moviesModel, grade);

mainNavigationController.init();
sortController.init();

render(elementMain, sectionFilmsComponent);
render(sectionFilmsComponent.getElement(), filmsAllListComponent);
render(elementHeader, user);

// statisticController.init();

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

api.getMovies().then((movies) => {
  moviesModel.setMovies(movies);
  mainFilmList.init();
  render(elementFooter, new QuantityFilms(movies.length));
});
