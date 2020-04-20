import FilmCard from "./components/film-card";
import FilmsContainer from "./components/films-container";
import ButtonShowMore from "./components/button-show-more";
import CommentsContainer from "./components/comments-container";
import Comment from "./components/comment";
import PopupFilmDetails from "./components/popup-film-details";
import NewComment from "./components/new-comment";

import {remove, render} from "./utils/methods-for-components";
import {generateComments} from "./moks/comments";

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
  const buttonClose = popupComponent.getElement().querySelector(`.film-details__close-btn`);
  buttonClose.addEventListener(`click`, () => {
    remove(popupComponent);
  });
};

const initFilm = (container, film) => {
  const filmComponent = new FilmCard(film);
  render(container, filmComponent);

  // реализует открытие большого попапа
  const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, () => {
    initPopupFilm(BODY_ELEMENT, film, commentsCount);
  });
};

const initFilmList = (filmsFiltersElement, films) => {
  const filmsComtainerComponent = new FilmsContainer();
  const filmList = filmsFiltersElement.querySelector(`.films-list`);

  render(filmList, filmsComtainerComponent);

  let showingCountFilms = SHOWING_FILMS_COUNT;

  films
    .slice(0, showingCountFilms)
    .forEach((film) => initFilm(filmsComtainerComponent.getElement(), film));

  const buttonComponent = new ButtonShowMore();
  render(filmList, buttonComponent);

  buttonComponent.getElement().addEventListener(`click`, () => {
    const prevCount = showingCountFilms;
    showingCountFilms += SHOWING_FILMS_COUNT;

    films
      .slice(prevCount, showingCountFilms)
      .forEach((film) => initFilm(filmsComtainerComponent.getElement(), film));

    if (showingCountFilms === films.length) {
      remove(buttonComponent);
    }
  });
};

export {initFilmList};
