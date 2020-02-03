import MovieModel from '../models/movie.js';
import CommentModel from '../models/comment.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(url, authorization) {
    this._url = url;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({path: `movies`})
      .then((response) => response.json())
      .then((movies) => movies.map((movie) => new MovieModel(movie)));
  }

  getComments(id) {
    return this._load({path: `/comments/${id}`})
      .then((response) => response.json())
      .then((comments) => comments.map((comment) => new CommentModel(comment)));
  }

  updateMovies(id, movieModel) {
    return this._load({
      path: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(movieModel.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((movie) => new MovieModel(movie));
  }

  addComment(id, commentModel) {
    return this._load({
      path: `/comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(commentModel.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((comment) => new CommentModel(comment));
  }

  sync(data) {
    return this._load({
      path: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  _load({path, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}/${path}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
}
