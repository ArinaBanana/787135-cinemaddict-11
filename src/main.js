import MoviesModel from "./models/movies-model";
import PageController from "./controllers/page";
import Provider from "./provider";
import Store from "./store";
import notification from "./components/notification";
import {api} from "./api";
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
