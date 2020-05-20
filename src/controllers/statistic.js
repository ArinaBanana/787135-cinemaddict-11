import Statistic from "../components/statistic";
import {render} from "../utils/methods-for-components";

export default class StatisticController {
  constructor(container, watchedFilms, grade) {
    this._container = container;
    this._watchedFilms = watchedFilms;

    this._grade = grade;
  }

  getAllDurationInMin() {
    const durations = this._watchedFilms.map((film) => film.duration);

    return durations.reduce((acc, num) => {
      return acc + num;
    });
  }

  getSortedGenreAndCount() {
    const countFilmsByGenres = this._watchedFilms.reduce((acc, film) => {
      const genres = film.genres;

      genres.forEach((genre) => {

        if (!acc[genre]) {
          acc[genre] = 1;
        } else {
          acc[genre] += 1;
        }

      });

      return acc;
    }, {});

    return Object.entries(countFilmsByGenres).sort((a, b) => b[1] - a[1]);
  }

  init() {
    const genresAndCounts = this.getSortedGenreAndCount();
    const filmsLength = this._watchedFilms.length;
    const allDurationInMin = this.getAllDurationInMin();

    const labels = [];
    const data = [];

    genresAndCounts.forEach(([genre, count]) => {
      labels.push(genre);
      data.push(count);
    });

    this._statisticComponent = new Statistic(filmsLength, labels, data, allDurationInMin, this._grade);

    render(this._container, this._statisticComponent);

    this.hide();
  }

  show() {
    this._statisticComponent.show();
  }

  hide() {
    this._statisticComponent.hide();
  }
}
