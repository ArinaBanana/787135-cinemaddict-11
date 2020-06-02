import MoviesModel from "./models/movies-model";
import PageController from "./controllers/page";
import Provider from "./api/provider";
import Store from "./api/store";
import notification from "./components/notification";
import {api} from "./api/api";
import {STORE_NAME} from "./utils/constant";

const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
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
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {

    })
    .catch(() => {

    });
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

export {apiWithProvider};
