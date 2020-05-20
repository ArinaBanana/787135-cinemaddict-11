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

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomFloatNumber = (min, max, precision = 1) => {
  return (min + Math.random() * (max - min)).toFixed(precision);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);

  return array[randomIndex];
};

const getRandomBoolean = () => {
  return Boolean(getRandomNumber(0, 2));
};

const makeIdGenerator = () => {
  let counter = 0;

  return () => {
    return counter++;
  };
};

const getUserGrade = (movies) => {
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

export {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomArrayItem,
  getRandomBoolean,
  getUserGrade,
  makeIdGenerator,
  BODY_ELEMENT,
  HIDDEN_CLASS,
  ENTER_KEY,
  ESC_KEY,
  ACTIVE_CLASS_FILTER,
  ACTIVE_CLASS_SORT,
  BAR_HEIGHT,
  RenderPosition,
  Grades,
};
