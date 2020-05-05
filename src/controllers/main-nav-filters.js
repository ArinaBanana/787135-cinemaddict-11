import MainNavigation from "../components/main-navigation";
import {render} from "../utils/methods-for-components";

export default class MainNavFiltersController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  init(filters) {
    this._filters = filters;
    const navComponent = new MainNavigation(this._filters);

    render(this._container, navComponent);
  }
}
