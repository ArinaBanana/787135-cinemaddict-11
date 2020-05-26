const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
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

export {
  getEmojiUrlByName,
  getUserGrade,
  RenderPosition,
};
