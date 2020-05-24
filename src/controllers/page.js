import MainNavigationController, {MenuItems} from "./main-navigation";
import SortController from "./sort";
import SectionFilms from "../components/section-films";
import FilmsAllList from "../components/films-all-list";
import FilmListController from "./film-list";
import UserProfile from "../components/user-profile";
import StatisticController from "./statistic";
import QuantityFilms from "../components/quantity-films";

import {getUserGrade} from "../utils/utils";
import {render} from "../utils/methods-for-components";

export default class PageController {
  constructor(header, main, footer, moviesModel) {
    this._moviesModel = moviesModel;
    this._elementHeader = header;
    this._elementMain = main;
    this._elementFooter = footer;
  }

  creatingComponents() {
    this._mainNavigationController = new MainNavigationController(this._elementMain, this._moviesModel);
    this._sortController = new SortController(this._elementMain, this._moviesModel);
    this._sectionFilmsComponent = new SectionFilms();
    this._filmsAllListComponent = new FilmsAllList();
    this._mainFilmList = new FilmListController(this._filmsAllListComponent, this._moviesModel);

    const movies = this._moviesModel.getAllMovies();
    this._quantity = new QuantityFilms(movies.length);

    const grade = getUserGrade(this._moviesModel);
    this._user = new UserProfile(grade);

    this._statisticController = new StatisticController(this._elementMain, this._moviesModel, grade);
  }

  render() {
    this.creatingComponents();

    render(this._elementHeader, this._user);
    render(this._elementFooter, this._quantity);
    render(this._elementMain, this._sectionFilmsComponent);
    render(this._sectionFilmsComponent.getElement(), this._filmsAllListComponent);

    this._sortController.init();
    this._mainNavigationController.init();
    this._mainFilmList.init();
    this._statisticController.init();

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
          break;
      }
    });
  }
}
