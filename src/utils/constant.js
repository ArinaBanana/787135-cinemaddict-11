// Элементы HTML
const BODY_ELEMENT = document.querySelector(`body`);

// Классы CSS
const HIDDEN_CLASS = `visually-hidden`;
const ACTIVE_CLASS_FILTER = `main-navigation__item--active`;
const ACTIVE_CLASS_SORT = `sort__button--active`;

// Ключи
const ENTER_KEY = `Enter`;
const ESC_KEY = `Escape`;
const COMMENT_FORM_FIELDS = [`comment`];
const EXTRA_SORT_TYPE = `comments`;

// Значения
const BAR_HEIGHT = 50;
const SHOWED_FILMS_COUNT = 5;
const SHOWED_EXTRA_FILMS_COUNT = 2;
const SHAKE_ANIMATION_TIMEOUT = 600;

// Сервер
const AUTHORIZATION = `Basic hrguy43grgh`;
const LINK = `https://11.ecmascript.pages.academy/cinemaddict`;

// Store
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export {
  BODY_ELEMENT,
  HIDDEN_CLASS,
  ENTER_KEY,
  ESC_KEY,
  ACTIVE_CLASS_FILTER,
  ACTIVE_CLASS_SORT,
  BAR_HEIGHT,
  AUTHORIZATION,
  LINK,
  COMMENT_FORM_FIELDS,
  SHOWED_FILMS_COUNT,
  SHOWED_EXTRA_FILMS_COUNT,
  SHAKE_ANIMATION_TIMEOUT,
  EXTRA_SORT_TYPE,
  STORE_NAME
};
