import MoviesModel from "./models/movies";
import PageController from "./controllers/page";
import {api} from "./api";

const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const moviesModel = new MoviesModel();

const pageController = new PageController(elementHeader, elementMain, elementFooter, moviesModel);

api.getMovies().then((movies) => {
  moviesModel.setMovies(movies);
  pageController.render();
});
