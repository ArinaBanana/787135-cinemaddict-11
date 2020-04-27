import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import FilmController from "./film";

import {remove, render} from "../utils/methods-for-components";

const SHOWING_FILMS_COUNT = 5;

const renderFilms = (filmList, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmList, onDataChange);
    filmController.init(film);

    return filmController;
  });
};

export default class FilmListController {
  constructor(container) {
    this._container = container;
    this._button = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();

    this._films = null;

    this._onDataChange = this._onDataChange.bind(this);
  }

  init(films) {
    this._films = films;

    const container = this._container.getElement();
    const filmList = container.querySelector(`.films-list`);

    render(filmList, this._filmsContainer);

    let showingCountFilms = SHOWING_FILMS_COUNT;

    renderFilms(this._filmsContainer.getElement(), this._films.slice(0, showingCountFilms), this._onDataChange);

    render(filmList, this._button);

    const onButtonShowMore = () => {
      const prevCount = showingCountFilms;
      showingCountFilms += SHOWING_FILMS_COUNT;

      renderFilms(this._filmsContainer.getElement(), this._films.slice(prevCount, showingCountFilms), this._onDataChange);

      if (showingCountFilms === this._films.length) {
        remove(this._button);
      }
    };

    this._button.setShowMoreHandler(onButtonShowMore);
  }

  _onDataChange(controller, oldFilm, newFilm) {
    const index = this._films.findIndex((film) => film === oldFilm);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));

    controller.init(this._films[index]);
  }
}
