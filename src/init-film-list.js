import FilmCard from "./components/film-card";
import FilmsContainer from "./components/films-container";
import ButtonShowMore from "./components/button-show-more";
import CommentsContainer from "./components/comments-container";
import Comment from "./components/comment";
import PopupFilmDetails from "./components/popup-film-details";
import NewComment from "./components/new-comment";

import {render} from "./utils/utils";

const SHOWING_FILMS_COUNT = 5;

const initFilm = (container, film) => {
  const filmComponent = new FilmCard(film);

  render(container, filmComponent.getElement());
};

const initFilmList = (filmsFiltersElement, films) => {
  const filmsComtainerComponent = new FilmsContainer();
  const filmList = filmsFiltersElement.querySelector(`.films-list`);

  render(filmList, filmsComtainerComponent.getElement());

  let showingCountFilms = SHOWING_FILMS_COUNT;

  films
    .slice(0, showingCountFilms)
    .forEach((film) => initFilm(filmsComtainerComponent.getElement(), film));

  const buttonComponent = new ButtonShowMore();
  render(filmList, buttonComponent.getElement());

  buttonComponent.getElement().addEventListener(`click`, () => {
    const prevCount = showingCountFilms;
    showingCountFilms += SHOWING_FILMS_COUNT;

    films
      .slice(prevCount, showingCountFilms)
      .forEach((film) => initFilm(filmsComtainerComponent.getElement(), film));

    if (showingCountFilms === films.length) {
      buttonComponent.getElement().remove();
      buttonComponent.removeElement();
    }
  });
};

const initComments = (container, comments) => {
  const commentsContainer = new CommentsContainer(comments.length);
  render(container, commentsContainer.getElement());

  const commentList = commentsContainer.getElement().querySelector(`.film-details__comments-list`);

  for (let i = 0; i < comments.length; i++) {
    const commentComponent = new Comment(comments[i]);
    render(commentList, commentComponent.getElement());
  }

  const newCommentComponent = new NewComment();
  render(commentsContainer.getElement(), newCommentComponent.getElement());
};

const initPopupFilm = (container, film, comments) => {
  const popupComponent = new PopupFilmDetails(film);
  render(container, popupComponent.getElement());

  const popup = container.querySelector(`.film-details`);
  const bottomContainer = popup.querySelector(`.form-details__bottom-container`);

  initComments(bottomContainer, comments);
};

export {initFilmList, initPopupFilm};
