const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const CodesResponse = {
  OK: 200,
  MULTIPLE_CHOICE: 300,
};

const PeriodStats = {
  ALL_TIME: {type: `all-time`, label: `All time`},
  TODAY: {type: `today`, label: `Today`},
  WEEK: {type: `week`, label: `Week`},
  MONTH: {type: `month`, label: `Month`},
  YEAR: {type: `year`, label: `Year`},
};

const TitlesForButton = {
  DELETE: `Delete`,
  DELETING: `Deleting...`,
};

const Grades = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`,
};

const getUserGrade = (moviesModel) => {
  const movies = moviesModel.getWatchedMovies();
  let grade;

  if (movies.length <= 10) {
    grade = Grades.NOVICE;
  } else if (movies.length <= 20) {
    grade = Grades.FAN;
  } else if (movies.length >= 21) {
    grade = Grades.MOVIE_BUFF;
  }

  return grade;
};

const getEmojiUrlByName = (emoji) => `./images/emoji/${emoji}.png`;

const isOnline = () => {
  return window.navigator.onLine;
};

export {
  getEmojiUrlByName,
  getUserGrade,
  isOnline,
  RenderPosition,
  Method,
  CodesResponse,
  PeriodStats,
  TitlesForButton,
};
