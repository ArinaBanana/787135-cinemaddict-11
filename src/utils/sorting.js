import moment from "moment";

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
    case SortTypes.DEFAULT:
    default:
      return showingFilms;
  }

};

export {SortTypes, getSortedFilms};
