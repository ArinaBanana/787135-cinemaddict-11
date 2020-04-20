import AbstractComponent from "./abstract";

const createStatisticTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class Statistic extends AbstractComponent {
  getTemplate() {
    return createStatisticTemplate();
  }
}
