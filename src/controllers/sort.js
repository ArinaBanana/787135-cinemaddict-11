import SortElement from "../components/sort-elements";
import {render} from "../utils/methods-for-components";
import {SortTypes} from "../utils/sorting";
import {RenderPosition} from "../utils/utils";

export default class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._sortComponent = new SortElement(this._createSortElements());
    this._onViewChangeHandler = this._onViewChangeHandler.bind(this);
    this._onModelSortChange = this._onModelSortChange.bind(this);
    this._onModelDataChange = this._onModelDataChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onViewChangeHandler);
    this._moviesModel.setSortingChangeHandlers(this._onModelSortChange);
    this._moviesModel.setFilmChangeHandlers(this._onModelDataChange);
    this._moviesModel.setFilmsChangeHandlers(this._onModelDataChange);
  }

  init() {
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  hide() {
    this._sortComponent.hide();
  }

  show() {
    this._sortComponent.show();
  }

  _createSortElements() {
    return Object.values(SortTypes).map((sortType) => {
      return {
        name: sortType,
        isActive: sortType === this._moviesModel.getCurrentSortType(),
      };
    });
  }

  _updateSorting() {
    const newSortElements = this._createSortElements();
    this._sortComponent.setSortType(newSortElements);
  }

  _onModelSortChange() {
    this._updateSorting();
  }

  _onModelDataChange() {
    this._updateSorting();
  }

  _onViewChangeHandler(sortType) {
    this._moviesModel.setSortType(sortType);
  }
}
