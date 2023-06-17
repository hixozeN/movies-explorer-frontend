import { LOCAL_STORAGE_TOKEN_KEY } from './globalVars';

class Api {
  constructor() {
    this._link = "https://api.diploma.hixozen.ru";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  }

  register({ email, password, name }) {
    return fetch(`${this._link}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email, password, name,
      })
    }).then((res) => this._checkResponse(res));
  };

  login({ email, password }) {
    return fetch(`${this._link}/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email, password,
      })
    }).then((res) => this._checkResponse(res));
  };

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        Accept: "*/*",
      },
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._link}/users/me `, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._link}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  saveMovie({ ...data }) {
    return fetch(`${this._link}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
      },
      method: "POST",
      body: JSON.stringify({
        ...data
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._link}/movies/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
      },
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api();

export default api;
