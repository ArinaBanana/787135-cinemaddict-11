import MainNavigationController, {MenuItems} from "./main-navigation";
import SortController from "./sort";
import SectionFilms from "../components/section-films";
import FilmsAllList from "../components/films-all-list";
import FilmListController from "./film-list";
import UserProfile from "../components/user-profile";
import StatisticController from "./statistic";
import QuantityFilms from "../components/quantity-films";
import Loading from "../components/loading";

import {getUserGrade} from "../utils/utils";
import {remove, render} from "../utils/components";

export default class PageController {
  constructor(header, main, footer, moviesModel) {
    this._moviesModel = moviesModel;
    this._elementHeader = header;
    this._elementMain = main;
    this._elementFooter = footer;

    this._handleFilmsChange = this._handleFilmsChange.bind(this);
    this._moviesModel.setFilmsChangeHandlers(this._handleFilmsChange);
  }

  _createComponents() {
    this._loading = new Loading();

    this._createMainNavigationController();
    this._sortController = new SortController(this._elementMain, this._moviesModel);
    this._sectionFilmsComponent = new SectionFilms();
    this._filmsAllListComponent = new FilmsAllList();
    this._mainFilmListController = new FilmListController(this._filmsAllListComponent, this._moviesModel);
    this._quantity = new QuantityFilms();

    this._user = new UserProfile();
  }

  _createMainNavigationController() {
    this._mainNavigationController = new MainNavigationController(this._elementMain, this._moviesModel);
    this._mainNavigationController.setChangeScreenHandler((menuItem) => {
      switch (menuItem) {
        case MenuItems.STATS:
          this._sortController.hide();
          this._filmsAllListComponent.hide();
          this._statisticController.show();
          break;
        default:
          this._sortController.show();
          this._filmsAllListComponent.show();
          this._statisticController.hide();
      }
    });
  }

  init() {
    this._createComponents();
    this._sortController.init();
    this._mainNavigationController.init();
    this._mainFilmListController.init();

    render(this._elementMain, this._loading);
    render(this._elementHeader, this._user);
    render(this._elementFooter, this._quantity);

  }

  _handleFilmsChange() {
    remove(this._loading);

    const grade = getUserGrade(this._moviesModel);
    this._user.setGrade(grade);

    const movies = this._moviesModel.getAllMovies();
    this._quantity.setCount(movies.length);

    this._statisticController = new StatisticController(this._elementMain, this._moviesModel, grade);
    this._statisticController.init();
    this._statisticController.hide();

    render(this._elementMain, this._sectionFilmsComponent);
    render(this._sectionFilmsComponent.getElement(), this._filmsAllListComponent);


  }
}
