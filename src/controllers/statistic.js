import Statistic from "../components/statistic";
import {PeriodStats} from "../utils/utils";
import {render} from "../utils/components";
import {filterFilmsByPeriod} from "../utils/stats";

export default class StatisticController {
  constructor(container, moviesModel, grade) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._grade = grade;
    this._statisticComponent = new Statistic(this._grade);

    this._onChangePeriodStats = this._onChangePeriodStats.bind(this);

    this._statisticComponent.setPeriodStatsHandler(this._onChangePeriodStats);
  }

  getAllDurationInMin(films) {
    const durations = films.map((film) => film.duration);

    return durations.reduce((acc, num) => {
      return acc + num;
    }, 0);
  }

  getSortedGenreAndCount(films) {
    const countFilmsByGenres = films.reduce((acc, film) => {
      const genres = film.genres;

      genres.forEach((genre) => {
        acc[genre] = acc[genre] ? acc[genre] + 1 : 1;
      });

      return acc;
    }, {});

    const entries = Object.entries(countFilmsByGenres).sort((a, b) => b[1] - a[1]);

    const labels = [];
    const data = [];

    entries.forEach(([genre, count]) => {
      labels.push(genre);
      data.push(count);
    });

    return {labels, data};
  }

  init() {
    render(this._container, this._statisticComponent);

    const {labels, data, filmsLength, allDurationInMin} = this._getDataForStatistic(this._moviesModel.getWatchedMovies());
    this._statisticComponent.setData(filmsLength, labels, data, allDurationInMin, PeriodStats.ALL_TIME.type);
  }

  show() {
    this._onChangePeriodStats(PeriodStats.ALL_TIME.type);
    this._statisticComponent.show();
  }

  hide() {
    this._statisticComponent.hide();
  }

  _getDataForStatistic(films) {
    const {labels, data} = this.getSortedGenreAndCount(films);
    const filmsLength = films.length;
    const allDurationInMin = this.getAllDurationInMin(films);

    return {labels, data, filmsLength, allDurationInMin};
  }

  _update(films, filterType) {
    const {labels, data, filmsLength, allDurationInMin} = this._getDataForStatistic(films);
    this._statisticComponent.setData(filmsLength, labels, data, allDurationInMin, filterType);
  }

  _onChangePeriodStats(filterType) {
    let filteredFilms;
    const allFilms = this._moviesModel.getWatchedMovies();
    switch (filterType) {
      case PeriodStats.ALL_TIME.type:
        filteredFilms = allFilms;
        break;
      case PeriodStats.TODAY.type:
        filteredFilms = filterFilmsByPeriod(allFilms, `day`);
        break;
      case PeriodStats.WEEK.type:
        filteredFilms = filterFilmsByPeriod(allFilms, `week`);
        break;
      case PeriodStats.MONTH.type:
        filteredFilms = filterFilmsByPeriod(allFilms, `month`);
        break;
      case PeriodStats.YEAR.type:
        filteredFilms = filterFilmsByPeriod(allFilms, `year`);
        break;
    }

    this._update(filteredFilms, filterType);
  }
}
