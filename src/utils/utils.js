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

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const render = (container, element) => {
  container.append(element);
};

export {getRandomNumber, getRandomFloatNumber, getRandomArrayItem, createElement, render};
