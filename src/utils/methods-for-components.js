import {RenderPosition} from "./utils";

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const render = (container, component, place = `beforeend`) => {
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

const replace = (newComponent, oldComponent) => {
  const oldChild = oldComponent.getElement();
  const newChild = newComponent.getElement();
  const parent = oldChild.parentElement;

  const isExistElements = !!(parent && newChild && oldChild);

  if (isExistElements && parent.contains(oldChild)) {
    parent.replaceChild(newChild, oldChild);
  }
};

export {createElement, render, remove, replace};
