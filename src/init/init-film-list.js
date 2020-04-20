import FilmCard from "../components/film-card";
import FilmsContainer from "../components/films-container";
import ButtonShowMore from "../components/button-show-more";
import CommentsContainer from "../components/comments-container";
import Comment from "../components/comment";
import PopupFilmDetails from "../components/popup-film-details";
import NewComment from "../components/new-comment";

import {remove, render} from "../utils/methods-for-components";
import {generateComments} from "../moks/comments";

const SHOWING_FILMS_COUNT = 5;
const BODY_ELEMENT = document.querySelector(`body`);

const commentsCount = generateComments();

const initComments = (container, comments) => {
  const commentsContainer = new CommentsContainer(comments.length);
  render(container, commentsContainer);

  const commentList = commentsContainer.getElement().querySelector(`.film-details__comments-list`);

  for (let i = 0; i < comments.length; i++) {
    const commentComponent = new Comment(comments[i]);
    render(commentList, commentComponent);
  }

  const newCommentComponent = new NewComment();
  render(commentsContainer.getElement(), newCommentComponent);
};

const initPopupFilm = (container, film, comments) => {
  const popupComponent = new PopupFilmDetails(film);
  render(container, popupComponent);

  const bottomContainer = popupComponent.getElement().querySelector(`.form-details__bottom-container`);
  initComments(bottomContainer, comments);

  // реализует закрытие попапа
  const onButtonClose = () => {
    remove(popupComponent);
  };

  popupComponent.setButtonCloseHandler(onButtonClose);
};

const initFilm = (container, film) => {
  const filmComponent = new FilmCard(film);
  render(container, filmComponent);

  // реализует открытие большого попапа
  const onOpenPopup = () => {
    initPopupFilm(BODY_ELEMENT, film, commentsCount);
  };

  filmComponent.setOpenPopupHandler(onOpenPopup);
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

    films
      .slice(0, showingCountFilms)
      .forEach((film) => initFilm(this._filmsContainer.getElement(), film));

    render(filmList, this._button);

    const onButtonShowMore = () => {
      const prevCount = showingCountFilms;
      showingCountFilms += SHOWING_FILMS_COUNT;

      films
        .slice(prevCount, showingCountFilms)
        .forEach((film) => initFilm(this._filmsContainer.getElement(), film));

      if (showingCountFilms === films.length) {
        remove(this._button);
      }
    };

    this._button.setShowMoreHandler(onButtonShowMore);
  }
}
