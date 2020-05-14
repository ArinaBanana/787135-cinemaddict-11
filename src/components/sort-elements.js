import AbstractComponent from "./abstract";
import {SortTypes} from "../utils/sorting";

const createSortElementsTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortTypes.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortTypes.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortTypes.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortElement extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortTypes.DEFAULT;
  }

  getTemplate() {
    return createSortElementsTemplate();
  }

  // getSortType() {
  //   return this._currentSortType;
  // }

  setSortTypeChangeHandler(handler) {
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
}
