import SortElement from "../components/sort-elements";
import {render} from "../utils/methods-for-components";
import {SortTypes} from "../utils/sorting";

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._currentSortType = SortTypes.DEFAULT;
    this._onSortTypeChangeHandler = this._onSortTypeChangeHandler.bind(this);
  }

  init() {
    const sortElements = this._createSortElements();

    this._sortComponent = new SortElement(sortElements);
    render(this._container, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler);
  }

  _createSortElements() {
    return Object.values(SortTypes).map((sortType) => {
      return {
        name: sortType,
        isActive: sortType === this._currentSortType,
      };
    });
  }

  _updateSorting(sortType) {
    if (sortType) {
      this._currentSortType = sortType;
    }

    const newSortElements = this._createSortElements();
    this._sortComponent.setSortType(newSortElements);
  }

  _onSortTypeChangeHandler(sortType) {
    this._currentSortType = sortType;
    this._moviesModel.setSortType(this._currentSortType);
    this._updateSorting(sortType);
  }
}
