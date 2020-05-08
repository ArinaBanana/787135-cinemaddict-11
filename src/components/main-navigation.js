import AbstractSmartComponent from "./abstract-smart";
import {ACTIVE_CLASS} from "../utils/utils";

const createNavItem = (filter) => {
  const {
    name,
    count,
    isActive,
  } = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? ACTIVE_CLASS : ``}" data-filter="${name}">
      ${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const navItems = filters
    .map((filter) => createNavItem(filter))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navItems}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }

  setFilterChangeHandlers(handler) {
    this._handler = handler;

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
    this.setFilterChangeHandlers(this._handler);
  }
}
