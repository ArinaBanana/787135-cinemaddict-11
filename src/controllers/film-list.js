import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import NoFilms from "../components/no-films";

import FilmController from "./film";

import {remove, render} from "../utils/components";

const createFilmControllers = (filmList, films, onDataChange, onClick) => {
  return films.map((film) => {
    const filmController = new FilmController(filmList, onDataChange, onClick, film);
    filmController.init();
    return filmController;
  });
};

export default class FilmListController {
  constructor(container, filmListContainer, adapter, popupController, {countShowedFilms, hideOnEmpty = false}) {
    this._container = container;
    this._filmListContainer = filmListContainer;

    this._filmsContainer = new FilmsContainer();
    this._noFilms = new NoFilms();
    this._countShowedFilms = countShowedFilms;
    this._adapter = adapter;
    this._hideOnEmpty = hideOnEmpty;
    this._showOnUpdate = true;

    this._showedFilmControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onButtonShowMore = this._onButtonShowMore.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilmUpdate = this._onFilmUpdate.bind(this);
    this._onFilmsChange = this._onFilmsChange.bind(this);

    this._adapter.setFilterChangeHandlers(this._onFilterChange);
    this._adapter.setSortingChangeHandlers(this._onSortChange);
    this._adapter.setFilmChangeHandlers(this._onFilmUpdate);
    this._adapter.setFilmsChangeHandlers(this._onFilmsChange);

    this._popupController = popupController;
  }

  init() {
    this._filmList = this._filmListContainer.getElement();
    render(this._filmList, this._filmsContainer);
    render(this._container.getElement(), this._filmListContainer);
  }

  hide() {
    this._showOnUpdate = false;
    this._filmListContainer.hide();
  }

  show() {
    this._showOnUpdate = true;
    this._filmListContainer.show();
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

    this._filteredFilms = this._adapter.getMovies();
    const isShowedLessThanCount = this._currentCountShowedFilms < this._countShowedFilms;
    const count = resetShowMore || isShowedLessThanCount ? this._countShowedFilms : this._currentCountShowedFilms;
    const filmsForRender = this._filteredFilms.slice(0, count);
    this._currentCountShowedFilms = filmsForRender.length;

    const isEmpty = filmsForRender.length === 0;
    const isShowMoreButtonShowed = Boolean(this._button);
    const needShowMoreButton = this._filteredFilms.length > this._currentCountShowedFilms;

    if (isShowMoreButtonShowed && !needShowMoreButton) {
      this._removeShowMoreButton();
    }

    if (isEmpty) {
      this._onEmptyData();
      return;
    }
    this._restoreView();

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

  _restoreView() {
    if (this._filmListContainer.isHidden() && this._showOnUpdate) {
      this._filmListContainer.show();
    }

    remove(this._noFilms);
  }

  _onEmptyData() {
    if (!this._hideOnEmpty) {
      render(this._filmList, this._noFilms);
    } else {
      this._filmListContainer.hide();
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
    const prevCount = this._currentCountShowedFilms;
    this._currentCountShowedFilms += this._countShowedFilms;

    const filmsForRender = this._filteredFilms.slice(prevCount, this._currentCountShowedFilms);

    if (filmsForRender.length !== this._countShowedFilms) {
      this._currentCountShowedFilms = prevCount + filmsForRender.length;
    }

    const newControllers = createFilmControllers(this._filmsContainer.getElement(), filmsForRender, this._onDataChange, this._onClick);
    this._showedFilmControllers = this._showedFilmControllers.concat(newControllers);

    if (this._currentCountShowedFilms === this._filteredFilms.length) {
      this._removeShowMoreButton();
    }
  }

  _onFilmUpdate() {
    this._renderFilms(false);
  }

  _onDataChange(newFilm) {
    this._adapter.updateFilm(newFilm);
  }

  _onClick(film) {
    this._popupController.setFilm(film);
    this._popupController.show();
  }
}
