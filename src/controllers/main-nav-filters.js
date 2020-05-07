import MainNavigation from "../components/main-navigation";
import {render} from "../utils/methods-for-components";
import {getFilmsByFilters, FilterTypes} from "../utils/filtration";

export default class MainNavFiltersController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterTypes.ALL_MOVIES;

    this._onViewFilterChange = this._onViewFilterChange.bind(this);
    this._onModelFilterChange = this._onModelFilterChange.bind(this);
  }

  init() {
    const filters = this._createFilters();
    this._navComponent = new MainNavigation(filters);
    this._navComponent.setFilterChangeHandlers(this._onViewFilterChange);

    render(this._container, this._navComponent);

    this._moviesModel.setFilterChangeHandlers(this._onModelFilterChange);
  }

  _createFilters() {
    const allMovies = this._moviesModel.getAllMovies();

    return Object.values(FilterTypes).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilters(allMovies, filterType).length,
        isActive: filterType === this._activeFilterType,
      };
    });
  }

  _onModelFilterChange(filterType) {
    this._activeFilterType = filterType;

    const newFilters = this._createFilters();
    this._navComponent.setFilters(newFilters);
  }

  _onViewFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
  }
}
