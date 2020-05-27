import MovieAdapter from "./models/movieAdapter";
import CommentAdapter from "./models/commentAdapter";
import {AUTHORIZATION, LINK} from "./utils/constant";
import {Method} from "./utils/utils";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class API {
  constructor(authorization, link) {
    this._authorization = authorization;
    this._link = link;
  }

  getMovies() {
    return this._load({
      url: `movies`,
    }).then((response) => response.json())
      .then(MovieAdapter.parseMovies);
  }

  getComments(filmId) {
    return this._load({
      url: `comments/${filmId}`
    }).then((response) => response.json())
      .then(CommentAdapter.parseComments);
  }

  changeDataMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`}),
    }).then((response) => response.json())
      .then(MovieAdapter.parseMovie);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._link}/${url}`, {method, body, headers})
      .then(checkStatus).catch((err) => {
        throw err;
      });
  }
}

const api = new API(AUTHORIZATION, LINK);

export {api};
