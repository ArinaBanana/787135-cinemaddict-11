import Navigation from "../components/navigation";
import FiltersNavigationController from "./filters-navigation";

import {render} from "../utils/methods-for-components";

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
  }

  init() {
    render(this._container, this._navigationComponent);

    const filtersController = new FiltersNavigationController(this._navigationComponent.getElement(), this._moviesModel);
    filtersController.init();
  }

  setChangeScreenHandler(handler) {
    this._navigationComponent.setSwitchScreenHandler(handler);
  }
}

export {MenuItems};
