const BODY_ELEMENT = document.querySelector(`body`);

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

export {getRandomNumber, getRandomFloatNumber, getRandomArrayItem, getRandomBoolean, makeIdGenerator, BODY_ELEMENT};
