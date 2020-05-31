import moment from "moment";

const filterFilmsByPeriod = (films, period) => {
  return films.filter((film) => {
    const currentDate = moment().startOf(`day`);
    const filmDate = moment(film.watchingDate).startOf(`day`);

    const periodBetween = currentDate.diff(filmDate, period);

    return periodBetween === 0;
  });
};

export {filterFilmsByPeriod};
