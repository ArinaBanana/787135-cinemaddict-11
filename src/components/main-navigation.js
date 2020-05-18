import AbstractSmartComponent from "./abstract-smart";
import {ACTIVE_CLASS_FILTER} from "../utils/utils";

const MenuItems = {
  STATS: `Stats`,
  ALL_MOVIES: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

const createNavItem = (filter) => {
  const {
    name,
    count,
    isActive,
  } = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? ACTIVE_CLASS_FILTER : ``}" data-filter="${name}">
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
      <a href="#stats" class="main-navigation__additional" data-stats="Stats">Stats</a>
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

  setSwitchingScreen(handler) {
    this.getElement()
      .querySelector(`.main-navigation__additional`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.dataset.stats === MenuItems.STATS) {
          handler(evt.target.dataset.stats);
        }
      });
  }

  recoveryListeners() {
    this.setFilterChangeHandlers(this._handler);
  }
}

export {MenuItems};
