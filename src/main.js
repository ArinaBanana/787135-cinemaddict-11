import MoviesModel from "./models/movies";
import API from "./api";
import PageController from "./controllers/page";

const AUTHORIZATION = `Basic hrguy43grgh`;
const elementHeader = document.querySelector(`.header`);
const elementFooter = document.querySelector(`.footer__statistics`);
const elementMain = document.querySelector(`.main`);

const moviesModel = new MoviesModel();
const api = new API(AUTHORIZATION);
const pageController = new PageController(elementHeader, elementMain, elementFooter, moviesModel);

api.getMovies().then((movies) => {
  moviesModel.setMovies(movies);
  pageController.render();
});
