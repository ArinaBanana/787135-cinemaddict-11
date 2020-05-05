import MainNavigation from "../components/main-navigation";
import {render} from "../utils/methods-for-components";
import {getFilmsByFilters, FilterTypes} from "../utils/filtration";

export default class MainNavFiltersController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterTypes.ALL_MOVIES;
  }

  init() {
    const films = this._moviesModel.getAllMovies();

    const filters = Object.values(FilterTypes).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilters(films).length,
        isActive: filterType === this._activeFilterType,
      };
    });

    const navComponent = new MainNavigation(filters);

    render(this._container, navComponent);
  }
}
