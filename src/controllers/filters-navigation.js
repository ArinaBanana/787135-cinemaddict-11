import Filters from "../components/filters";
import {render} from "../utils/methods-for-components";
import {getFilmsByFilters, FilterTypes} from "../utils/filtration";
import {RenderPosition} from "../utils/utils";

export default class FiltersNavigationController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._onViewFilterChange = this._onViewFilterChange.bind(this);
    this._onModelFilterChange = this._onModelFilterChange.bind(this);
    this._onModelDataChange = this._onModelDataChange.bind(this);

    this._moviesModel.setFilterChangeHandlers(this._onModelFilterChange);
    this._moviesModel.setFilmChangeHandlers(this._onModelDataChange);
    this._moviesModel.setFilmsChangeHandlers(this._onModelDataChange);
  }

  init() {
    const filters = this._createFilters();
    this._filtersComponent = new Filters(filters);
    this._filtersComponent.setLinkClickHandler(this._onViewFilterChange);

    render(this._container, this._filtersComponent, RenderPosition.AFTERBEGIN);
  }

  setChangeScreen(handler) {
    this._filtersComponent.setLinkClickHandler(handler);
  }

  _createFilters() {
    const allMovies = this._moviesModel.getAllMovies();

    return Object.values(FilterTypes).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilters(allMovies, filterType).length,
        isActive: filterType === this._moviesModel.getCurrentFilter(),
      };
    });
  }

  _onModelFilterChange() {
    this._updateFilter();
  }

  _onModelDataChange() {
    this._updateFilter();
  }

  _updateFilter() {
    const newFilters = this._createFilters();
    this._filtersComponent.setFilters(newFilters);
  }

  _onViewFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
  }
}
