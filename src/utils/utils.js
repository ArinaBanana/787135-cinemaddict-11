const BODY_ELEMENT = document.querySelector(`body`);
const ENTER_KEY = `Enter`;
const ESC_KEY = `Escape`;
const ACTIVE_CLASS = `main-navigation__item--active`;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
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

export {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomArrayItem,
  getRandomBoolean,
  makeIdGenerator,
  BODY_ELEMENT,
  ENTER_KEY,
  ESC_KEY,
  ACTIVE_CLASS,
  RenderPosition,
};
