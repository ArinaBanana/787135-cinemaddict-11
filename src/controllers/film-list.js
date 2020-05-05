import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import FilmController from "./film";

import {remove, render} from "../utils/methods-for-components";
import PopupController from "./popup";
import {BODY_ELEMENT} from "../utils/utils";

const SHOWING_FILMS_COUNT = 5;

const renderFilms = (filmList, films, onDataChange, onClick) => {
  return films.map((film) => {
    const filmController = new FilmController(filmList, onDataChange, onClick);
    filmController.init(film);

    return filmController;
  });
};

export default class FilmListController {
  constructor(container, filmsModel) {
    this._container = container;
    this._button = new ButtonShowMore();
    this._filmsContainer = new FilmsContainer();

    this._filmsModel = filmsModel;
    this._currentFilm = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  init() {
    this._films = this._filmsModel.getAllMovies();

    const container = this._container.getElement();
    const filmList = container.querySelector(`.films-list`);

    render(filmList, this._filmsContainer);

    let showingCountFilms = SHOWING_FILMS_COUNT;

    renderFilms(this._filmsContainer.getElement(), this._films.slice(0, showingCountFilms), this._onDataChange, this._onClick);

    render(filmList, this._button);

    const onButtonShowMore = () => {
      const prevCount = showingCountFilms;
      showingCountFilms += SHOWING_FILMS_COUNT;

      renderFilms(this._filmsContainer.getElement(), this._films.slice(prevCount, showingCountFilms), this._onDataChange, this._onClick);

      if (showingCountFilms === this._films.length) {
        remove(this._button);
      }
    };

    this._button.setShowMoreHandler(onButtonShowMore);

    this._popupController = new PopupController(BODY_ELEMENT);
  }

  _onDataChange(controller, oldFilm, newFilm) {
    const index = this._films.findIndex((film) => film === oldFilm);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));

    controller.init(this._films[index]);
  }

  _onClick(film) {
    this._currentFilm = film;
    this._popupController.setFilm(this._currentFilm);
  }
}
