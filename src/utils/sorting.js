import moment from "moment";
import {EXTRA_SORT_TYPE} from "./constant";

const SortTypes = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const getSortedFilms = (films, sortType) => {
  const showingFilms = films.slice();

  switch (sortType) {
    case SortTypes.DATE:
      return showingFilms.sort((a, b) => moment(b.releaseDate) - moment(a.releaseDate));
    case SortTypes.RATING:
      return showingFilms.sort((a, b) => b.rating - a.rating);
    case EXTRA_SORT_TYPE:
      return showingFilms.sort((a, b) => b.comments.length - a.comments.length);
    case SortTypes.DEFAULT:
    default:
      return showingFilms;
  }

};

export {SortTypes, getSortedFilms};
