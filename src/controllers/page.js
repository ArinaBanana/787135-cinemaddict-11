import MainNavigationController, {MenuItems} from "./main-navigation";
import SortController from "./sort";
import FilmListController from "./film-list";
import StatisticController from "./statistic";

import SectionFilms from "../components/section-films";
import FilmsAllList from "../components/films-all-list";
import UserProfile from "../components/user-profile";
import QuantityFilms from "../components/quantity-films";
import Loading from "../components/loading";

import MainMoviesListAdapter from "../models/main-movies-list-adapter";

import {getUserGrade} from "../utils/utils";
import {remove, render} from "../utils/components";
import {SHOWED_FILMS_COUNT, SHOWED_EXTRA_FILMS_COUNT, BODY_ELEMENT} from "../utils/constant";
import FilmsExtra from "../components/films-extra";
import TopRatedMoviesListAdapter from "../models/top-rated-movies-list-adapter";
import MostCommentedMoviesListAdapter from "../models/most-commented-movies-list-adapter";
import {FilterTypes} from "../utils/filtration";
import PopupController from "./popup";

export default class PageController {
  constructor(header, main, footer, moviesModel) {
    this._moviesModel = moviesModel;
    this._elementHeader = header;
    this._elementMain = main;
    this._elementFooter = footer;

    this._handleFilmsChange = this._handleFilmsChange.bind(this);
    this._moviesModel.setFilmsChangeHandlers(this._handleFilmsChange);
  }

  init() {
    this._createComponents();
    this._sortController.init();
    this._mainNavigationController.init();
    this._mainFilmListController.init();
    this._topRatedFilmListController.init();
    this._mostCommentedFilmListController.init();

    render(this._elementMain, this._loading);
    render(this._elementHeader, this._user);
    render(this._elementFooter, this._quantity);
  }

  _createComponents() {
    this._loading = new Loading();

    this._createMainNavigationController();
    this._sortController = new SortController(this._elementMain, this._moviesModel);
    this._sectionFilmsComponent = new SectionFilms();

    this._filmsAllListComponent = new FilmsAllList();
    this._filmsTopRatedComponent = new FilmsExtra(`Top rated`);
    this._filmsMostCommentedComponent = new FilmsExtra(`Most commented`);
    this._popupController = new PopupController(BODY_ELEMENT, (film) => {
      this._moviesModel.updateMovie(film);
    });
    this._mainFilmListController = new FilmListController(
        this._sectionFilmsComponent,
        this._filmsAllListComponent,
        new MainMoviesListAdapter(this._moviesModel),
        this._popupController,
        {countShowedFilms: SHOWED_FILMS_COUNT}
    );
    this._topRatedFilmListController = new FilmListController(
        this._sectionFilmsComponent,
        this._filmsTopRatedComponent,
        new TopRatedMoviesListAdapter(this._moviesModel),
        this._popupController,
        {countShowedFilms: SHOWED_EXTRA_FILMS_COUNT, hideOnEmpty: true}
    );
    this._mostCommentedFilmListController = new FilmListController(
        this._sectionFilmsComponent,
        this._filmsMostCommentedComponent,
        new MostCommentedMoviesListAdapter(this._moviesModel),
        this._popupController,
        {countShowedFilms: SHOWED_EXTRA_FILMS_COUNT, hideOnEmpty: true}
    );

    this._quantity = new QuantityFilms();

    this._user = new UserProfile();
  }

  _createMainNavigationController() {
    this._mainNavigationController = new MainNavigationController(this._elementMain, this._moviesModel);
    this._mainNavigationController.setChangeScreenHandler((menuItem) => {
      if (menuItem !== FilterTypes.ALL_MOVIES) {
        this._topRatedFilmListController.hide();
        this._mostCommentedFilmListController.hide();
      } else {
        this._topRatedFilmListController.show();
        this._mostCommentedFilmListController.show();
      }
      switch (menuItem) {
        case MenuItems.STATS:
          this._sortController.hide();
          this._sectionFilmsComponent.hide();
          this._moviesModel.setFilter(null);
          this._mainNavigationController.setActiveStats(true);
          this._statisticController.show();
          break;
        default:
          this._sortController.show();
          this._sectionFilmsComponent.show();
          this._mainNavigationController.setActiveStats(false);
          this._statisticController.hide();
      }
    });
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
  }
}
