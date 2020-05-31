import Navigation from "../components/navigation";
import FiltersNavigationController from "./filters-navigation";

import {render} from "../utils/methods-for-components";
import {RenderPosition} from "../utils/utils";

const MenuItems = {
  STATS: `Stats`,
  ALL_MOVIES: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

export default class MainNavigationController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._navigationComponent = new Navigation();
    this._filtersController = new FiltersNavigationController(this._navigationComponent.getElement(), this._moviesModel);
    this._filtersController.init();
  }

  init() {
    render(this._container, this._navigationComponent, RenderPosition.AFTERBEGIN);
  }

  setChangeScreenHandler(handler) {
    this._navigationComponent.setSwitchScreenHandler(handler);
    this._filtersController.setChangeScreen(handler);
  }
}

export {MenuItems};
