import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import NoFilms from "../components/no-films";

import FilmController from "./film";
import PopupController from "./popup";

import {remove, render} from "../utils/components";
import {BODY_ELEMENT, SHOWING_FILMS_COUNT} from "../utils/constant";

const createFilmControllers = (filmList, films, onDataChange, onClick) => {
  return films.reduce((acc, film) => {
    const key = film.id;

    const filmController = new FilmController(filmList, onDataChange, onClick, film);
    filmController.init();

    acc[key] = filmController;

    return acc;
  }, {});
};

export default class FilmListController {
  constructor(container, moviesModel) {
    this._container = container;

    this._filmsContainer = new FilmsContainer();
    this._noFilms = new NoFilms();

    this._moviesModel = moviesModel;

    this._showedFilmControllers = {};

    this._onDataChange = this._onDataChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onButtonShowMore = this._onButtonShowMore.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilmUpdate = this._onFilmUpdate.bind(this);
    this._onFilmsChange = this._onFilmsChange.bind(this);

    this._moviesModel.setFilterChangeHandlers(this._onFilterChange);
    this._moviesModel.setSortingChangeHandlers(this._onSortChange);
    this._moviesModel.setFilmChangeHandlers(this._onFilmUpdate);
    this._moviesModel.setFilmsChangeHandlers(this._onFilmsChange);

    this._popupController = new PopupController(BODY_ELEMENT, this._onDataChange);
  }

  init() {
    this._filmList = this._container.getElement();
    render(this._filmList, this._filmsContainer);
  }

  _remove() {
    Object.values(this._showedFilmControllers).forEach((controller) => controller.destroy());

    this._showedFilmControllers = {};
  }

  _renderShowMoreButton() {
    this._button = new ButtonShowMore();
    this._button.setShowMoreHandler(this._onButtonShowMore);
    render(this._filmList, this._button);
  }

  _removeShowMoreButton() {
    remove(this._button);
    this._button = null;
  }

  _renderFilms() {
    this._remove();

    const films = this._moviesModel.getMovies();
    const filmsForRender = films.slice(0, SHOWING_FILMS_COUNT);

    const isEmpty = filmsForRender.length === 0;
    const isShowMoreButtonShowed = Boolean(this._button);
    const needShowMoreButton = films.length > SHOWING_FILMS_COUNT;

    if (isShowMoreButtonShowed && !needShowMoreButton) {
      this._removeShowMoreButton();
    }

    if (isEmpty) {
      render(this._filmList, this._noFilms);
      return;
    }

    remove(this._noFilms);

    this._showingCountFilms = filmsForRender.length;

    this._showedFilmControllers = createFilmControllers(
        this._filmsContainer.getElement(),
        filmsForRender,
        this._onDataChange,
        this._onClick
    );

    if (needShowMoreButton && !isShowMoreButtonShowed) {
      this._renderShowMoreButton();
    }
  }

  _onFilmsChange() {
    this._renderFilms();
  }

  _onFilterChange() {
    this._renderFilms();
  }

  _onSortChange() {
    this._renderFilms();
  }

  _onButtonShowMore() {
    const prevCount = this._showingCountFilms;
    this._showingCountFilms += SHOWING_FILMS_COUNT;

    const filmsForRender = this._moviesModel.getMovies().slice(prevCount, this._showingCountFilms);

    if (filmsForRender.length !== SHOWING_FILMS_COUNT) {
      this._showingCountFilms = prevCount + filmsForRender.length;
    }

    const newControllers = createFilmControllers(this._filmsContainer.getElement(), filmsForRender, this._onDataChange, this._onClick);
    Object.assign(this._showedFilmControllers, newControllers);

    if (this._showingCountFilms === this._moviesModel.getMovies().length) {
      this._removeShowMoreButton();
    }
  }

  _onFilmUpdate(film) {
    const filmController = this._showedFilmControllers[film.id];

    if (filmController) {
      filmController.setFilm(film);

      if (this._popupController.getIsShowed()) {
        this._popupController.setFilm(film);
      }
    }
  }

  _onDataChange(newFilm) {
    this._moviesModel.updateMovie(newFilm);
  }

  _onClick(film) {
    this._popupController.setFilm(film);
    this._popupController.show();
  }
}
