import AbstractSmartComponent from "./abstract-smart";
import {SortTypes} from "../utils/sorting";
import {ACTIVE_CLASS_SORT} from "../utils/utils";

const createSortItem = (element) => {
  const {
    name,
    isActive,
  } = element;

  return (
    `<li>
      <a href="#" data-sort-type="${name}" class="sort__button ${isActive ? ACTIVE_CLASS_SORT : ``}">Sort by ${name}</a>
    </li>`
  );
};

const createSortElementsTemplate = (elements) => {
  const sortItems = elements
    .map((element) => createSortItem(element))
    .join(`\n`);

  return (
    `<ul class="sort">
      ${sortItems}
    </ul>`
  );
};

export default class SortElement extends AbstractSmartComponent {
  constructor(sortElements) {
    super();

    this._sortElements = sortElements;
    this._currentSortType = SortTypes.DEFAULT;
  }

  getTemplate() {
    return createSortElementsTemplate(this._sortElements);
  }

  setSortType(sortElements) {
    this._sortElements = sortElements;
    this.rerender();
  }

  setSortTypeChangeHandler(handler) {
    this._handler = handler;

    this.getElement()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `A`) {
          return;
        }

        const sortType = evt.target.dataset.sortType;

        if (this._currentSortType === sortType) {
          return;
        }

        this._currentSortType = sortType;

        handler(this._currentSortType);
      });
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._handler);
  }
}
