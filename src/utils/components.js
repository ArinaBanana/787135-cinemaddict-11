import {RenderPosition} from "./utils";
import {SHAKE_ANIMATION_TIMEOUT} from "./constant";

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const shake = (component) => {
  component.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    component.getElement().style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};

export {createElement, render, remove, shake};
