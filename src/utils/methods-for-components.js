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
