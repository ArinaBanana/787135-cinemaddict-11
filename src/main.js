import MoviesModel from "./models/movies-model";
import PageController from "./controllers/page";
import notification from "./components/notification";
import {api} from "./api";

const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const pageController = new PageController(elementHeader, elementMain, elementFooter, moviesModel);

pageController.init();

api.getMovies()
  .catch(() => {
    notification.alert({type: `error`, text: `Error loading movies... Please, try again later`, stay: true});
  })
  .then((movies) => {
    moviesModel.setMovies(movies);
  });
