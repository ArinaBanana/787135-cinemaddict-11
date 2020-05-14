import SortElement from "../components/sort-elements";
import {render} from "../utils/methods-for-components";
import {getSortedFilms, SortTypes} from "../utils/sorting";

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._sortComponent = new SortElement();

    this._currentSortType = SortTypes.DEFAULT;

    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);
  }

  init() {
    render(this._container, this._sortComponent);
  }

  _onSortTypeChangeHandler(sortType) {
    this._currentSortType = sortType;
    getSortedFilms(this._moviesModel.getAllMovies(), sortType);
  }
}
