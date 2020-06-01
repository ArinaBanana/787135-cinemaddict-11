import AbstractComponent from "./abstract";

const createMainNavigationTemplate = () => {
  return (
    `<nav class="main-navigation"></nav>`
  );
};

export default class Navigation extends AbstractComponent {
  getTemplate() {
    return createMainNavigationTemplate();
  }
}
