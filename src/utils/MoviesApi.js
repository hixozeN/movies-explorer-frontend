class MoviesApi {
  constructor() {
    this._link = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  }

  getMovies() {
    return fetch(this._link, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }
}

const beatApi = new MoviesApi();

export default beatApi;
