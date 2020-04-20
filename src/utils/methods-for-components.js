const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

const render = (container, component) => {
  container.append(component.getElement());
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {createElement, render, remove};
