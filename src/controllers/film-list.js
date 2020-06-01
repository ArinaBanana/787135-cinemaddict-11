import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import NoFilms from "../components/no-films";

import FilmController from "./film";
import PopupController from "./popup";

import {remove, render} from "../utils/components";
import {BODY_ELEMENT, SHOWING_FILMS_COUNT} from "../utils/constant";

const createFilmControllers = (filmList, films, onDataChange, onClick) => {
  return films.map((film) => {
    const filmController = new FilmController(filmList, onDataChange, onClick, film);
    filmController.init();
    return filmController;
  });
};

export default class FilmListController {
  constructor(container, moviesModel) {
    this._container = container;

    this._filmsContainer = new FilmsContainer();
    this._noFilms = new NoFilms();

    this._moviesModel = moviesModel;

    this._showedFilmControllers = [];

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
    this._showedFilmControllers.forEach((controller) => controller.destroy());
    this._showedFilmControllers = [];
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

  _renderFilms(resetShowMore = true) {
    this._remove();

    this._filteredFilms = this._moviesModel.getMovies();
    const filmsForRender = this._filteredFilms.slice(0, resetShowMore ? SHOWING_FILMS_COUNT : this._showingCountFilms);

    const isEmpty = filmsForRender.length === 0;
    const isShowMoreButtonShowed = Boolean(this._button);
    const needShowMoreButton = this._filteredFilms.length > SHOWING_FILMS_COUNT;

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

    const filmsForRender = this._filteredFilms.slice(prevCount, this._showingCountFilms);

    if (filmsForRender.length !== SHOWING_FILMS_COUNT) {
      this._showingCountFilms = prevCount + filmsForRender.length;
    }

    const newControllers = createFilmControllers(this._filmsContainer.getElement(), filmsForRender, this._onDataChange, this._onClick);
    this._showedFilmControllers = this._showedFilmControllers.concat(newControllers);

    if (this._showingCountFilms === this._filteredFilms.length) {
      this._removeShowMoreButton();
    }
  }

  _onFilmUpdate(film) {
    this._renderFilms(false);

    if (this._popupController.getIsShowed()) {
      this._popupController.setFilm(film);
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
