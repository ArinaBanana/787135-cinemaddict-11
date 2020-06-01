import Navigation from "../components/navigation";
import LinkStats from "../components/link-stats";
import FiltersNavigationController from "./filters-navigation";

import {render} from "../utils/components";
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
    this._linkStatsComponent = new LinkStats();

    this._filtersController = new FiltersNavigationController(this._navigationComponent.getElement(), this._moviesModel);
    this._filtersController.init();
  }

  init() {
    render(this._container, this._navigationComponent, RenderPosition.AFTERBEGIN);
    render(this._navigationComponent.getElement(), this._linkStatsComponent);
  }

  setChangeScreenHandler(handler) {
    this._linkStatsComponent.setSwitchScreenHandler(handler);
    this._filtersController.setChangeScreenHandler(handler);
  }

  setActiveStats(isActive) {
    this._linkStatsComponent.setActiveStats(isActive);
  }
}

export {MenuItems};
