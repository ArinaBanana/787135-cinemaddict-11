import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import FilmController from "./film";

import {remove, render} from "../utils/methods-for-components";

const SHOWING_FILMS_COUNT = 5;

const renderFilms = (filmList, films) => {
  return films.map((film) => {
    const filmController = new FilmController(filmList);
    filmController.init(film);

    return filmController;
  });
};

export default class FilmListController {
  constructor(container) {
    this._container = container;
    this._button = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();
  }

  init(films) {
    const container = this._container.getElement();
    const filmList = container.querySelector(`.films-list`);

    render(filmList, this._filmsContainer);

    let showingCountFilms = SHOWING_FILMS_COUNT;

    renderFilms(this._filmsContainer.getElement(), films.slice(0, showingCountFilms));

    render(filmList, this._button);

    const onButtonShowMore = () => {
      const prevCount = showingCountFilms;
      showingCountFilms += SHOWING_FILMS_COUNT;

      renderFilms(this._filmsContainer.getElement(), films.slice(prevCount, showingCountFilms));

      if (showingCountFilms === films.length) {
        remove(this._button);
      }
    };

    this._button.setShowMoreHandler(onButtonShowMore);
  }
}
