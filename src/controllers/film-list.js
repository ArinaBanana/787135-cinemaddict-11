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

    this._showedFilmControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onButtonShowMore = this._onButtonShowMore.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  init() {

    this._filmsModel.setFilterChangeHandlers(this._onFilterChange);

    const container = this._container.getElement();
    this._filmList = container.querySelector(`.films-list`);

    render(this._filmList, this._filmsContainer);
    render(this._filmList, this._button);
    this._button.setShowMoreHandler(this._onButtonShowMore);
    this._popupController = new PopupController(BODY_ELEMENT);

    this._renderFilms();
  }

  _renderFilms() {
    this._films = this._filmsModel.getMoviesByFiltration();
    this._showingCountFilms = SHOWING_FILMS_COUNT;
    this._showedFilmControllers = renderFilms(this._filmsContainer.getElement(), this._films.slice(0, this._showingCountFilms), this._onDataChange, this._onClick);
  }

  _remove() {
    this._showedFilmControllers.map((controller) => controller.destroy());
    this._showedFilmControllers = [];
    this._renderFilms();
  }

  _onFilterChange() {
    this._remove();
    render(this._filmList, this._button);
    this._button.rerender();
  }

  _onButtonShowMore() {
    const prevCount = this._showingCountFilms;
    this._showingCountFilms += SHOWING_FILMS_COUNT;

    const filmsForRender = this._films.slice(prevCount, this._showingCountFilms);

    if (filmsForRender.length !== SHOWING_FILMS_COUNT) {
      this._showingCountFilms = prevCount + filmsForRender.length;
    }

    const newControllers = renderFilms(this._filmsContainer.getElement(), filmsForRender, this._onDataChange, this._onClick);
    this._showedFilmControllers = this._showedFilmControllers.concat(newControllers);

    if (this._showingCountFilms === this._films.length) {
      remove(this._button);
    }
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
