import moment from "moment";

const filterFilmsByPeriod = (films, period) => {
  return films.filter((film) => {
    // startOf(day) для вычисления именно "Сегодня" (напр., 20.05 00:00 и 20.05 23:59), а не "Последние сутки" (напр., 20.05 20:10 и 21.05 20:09)
    const currentDate = moment().startOf(`day`);
    const filmDate = moment(film.watchingDate).startOf(`day`);

    const periodBetween = currentDate.diff(filmDate, period);

    return periodBetween === 0;
  });
};

export {filterFilmsByPeriod};
