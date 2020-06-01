import {ACTIVE_CLASS_FILTER} from "../utils/constant";
import AbstractSmartComponent from "./abstract-smart";

const createLinkStatsTemplate = (isActive) => {
  return (
    `<a href="#stats" class="main-navigation__additional ${isActive ? ACTIVE_CLASS_FILTER : ``}" data-stats="Stats">Stats</a>`
  );
};

export default class LinkStats extends AbstractSmartComponent {
  constructor() {
    super();
    this._isActiveStats = false;
  }

  getTemplate() {
    return createLinkStatsTemplate(this._isActiveStats);
  }

  setSwitchScreenHandler(handler) {
    this._handler = handler;

    this.getElement().addEventListener(`click`, (evt) => {
      handler(evt.target.dataset.stats);
    });
  }

  setActiveStats(isActive) {
    this._isActiveStats = isActive;
    super.rerender();
  }

  recoveryListeners() {
    this.setSwitchScreenHandler(this._handler);
  }
}
