import AbstractComponent from "./abstract";

const activeClass = `main-navigation__item--active`;

const createNavItem = (filter) => {
  const {
    name,
    count,
    isActive,
  } = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? ACTIVE_CLASS : ``}">
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

export default class MainNavigation extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }
}
