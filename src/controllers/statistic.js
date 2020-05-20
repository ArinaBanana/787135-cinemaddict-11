import Statistic from "../components/statistic";
import {render} from "../utils/methods-for-components";

export default class StatisticController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  getFilmsWatched() {
    const movies = this._moviesModel.getAllMovies();
    return movies.filter((movie) => movie.alreadyWatched);
  }

  getAllDurationInMin() {
    const watchedFilms = this.getFilmsWatched();
    const durations = watchedFilms.map((film) => film.duration);

    return durations.reduce((acc, num) => {
      return acc + num;
    });
  }

  getSortedGenreAndCount() {
    const watchedFilms = this.getFilmsWatched();

    const countFilmsByGenres = watchedFilms.reduce((acc, film) => {
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
    const filmsLength = this.getFilmsWatched().length;
    const allDurationInMin = this.getAllDurationInMin();

    const labels = [];
    const data = [];

    genresAndCounts.forEach(([genre, count]) => {
      labels.push(genre);
      data.push(count);
    });

    this._statisticComponent = new Statistic(filmsLength, labels, data, allDurationInMin);

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
