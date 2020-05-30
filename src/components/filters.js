import AbstractSmartComponent from "./abstract-smart";
import {ACTIVE_CLASS_FILTER} from "../utils/constant";

const createFilter = (filter) => {
  const {
    name,
    count,
    isActive,
  } = filter;

  const isFirstFilter = (name === `All movies`);

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? ACTIVE_CLASS_FILTER : ``}" data-filter="${name}">
      ${name}
      ${isFirstFilter ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

const createFiltersTemplate = (filters) => {
  const navItems = filters
    .map((filter) => createFilter(filter))
    .join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${navItems}
    </div>`
  );
};

export default class Filters extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChangeHandlers(handler) {
    this._changeHandler = handler;

    const links = this.getElement().querySelectorAll(`.main-navigation__item`);

    Array.prototype.forEach.call(links, (link) => link.addEventListener(`click`, (evt) => {
      const filter = evt.currentTarget.dataset.filter;
      if (filter) {
        handler(filter);
      }
    }));
  }

  setSwitchScreenHandler(handler) {
    this._switchHandler = handler;

    const links = this.getElement().querySelectorAll(`.main-navigation__item`);

    Array.prototype.forEach.call(links, (link) => link.addEventListener(`click`, (evt) => {
      const filter = evt.currentTarget.dataset.filter;

      if (filter) {
        handler(filter);
      }
    }));
  }

  setFilters(filters) {
    this._filters = filters;
    this.rerender();
  }

  recoveryListeners() {
    this.setFilterChangeHandlers(this._changeHandler);
    this.setSwitchScreenHandler(this._switchHandler);
  }
}
