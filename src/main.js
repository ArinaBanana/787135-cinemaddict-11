import MoviesModel from "./models/movies-model";
import PageController from "./controllers/page";
import notification from "./components/notification";
import {apiWithProvider} from "./api/provider";

const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const pageController = new PageController(elementHeader, elementMain, elementFooter, moviesModel);

pageController.init();

apiWithProvider.getMovies()
  .catch(() => {
    notification.alert({type: `error`, text: `Error loading movies... Please, try again later`, stay: true});
  })
  .then((movies) => {
    moviesModel.setMovies(movies);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`).catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync().then((movies) => {
    moviesModel.setMovies(movies);
  });
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
