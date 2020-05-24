const BODY_ELEMENT = document.querySelector(`body`);
const HIDDEN_CLASS = `visually-hidden`;
const ENTER_KEY = `Enter`;
const ESC_KEY = `Escape`;
const ACTIVE_CLASS_FILTER = `main-navigation__item--active`;
const ACTIVE_CLASS_SORT = `sort__button--active`;
const BAR_HEIGHT = 50;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const Grades = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`,
};

const getUserGrade = (moviesModel) => {
  const movies = moviesModel.getWatchedMovies();
  let grade;

  if (movies.length <= 10) {
    grade = Grades.NOVICE;
  } else if (movies.length <= 20) {
    grade = Grades.FAN;
  } else if (movies.length >= 21) {
    grade = Grades.MOVIE_BUFF;
  } else if (movies.length === 0) {
    grade = ``;
  }

  return grade;
};

const getEmojiUrlByName = (emoji) => `./images/emoji/${emoji}.png`;

export {
  getEmojiUrlByName,
  getUserGrade,
  BODY_ELEMENT,
  HIDDEN_CLASS,
  ENTER_KEY,
  ESC_KEY,
  ACTIVE_CLASS_FILTER,
  ACTIVE_CLASS_SORT,
  BAR_HEIGHT,
  RenderPosition,
};
