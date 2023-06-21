import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Suspense, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';
import { DeviceContext, windowWidth } from '../../contexts/DeviceContext/DeviceContext';
import Preloader from '../Preloader/Preloader';
import { LandingPage } from '../Landing/Landing.lazy';
import { MainPage } from '../Main/Main.lazy';
import { NotFoundPage } from '../NotFound/NotFound.lazy';
import { RegisterPage } from '../Register/Register.lazy';
import { ProfilePage } from '../Profile/Profile.lazy';
import { LoginPage } from '../Login/Login.lazy';
import { SavedMoviesPage } from '../SavedMovies/SavedMovies.lazy';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import { ApiServiceContext } from '../../contexts/ApiServiceContext/ApiServiceContext';
import { BEAT_API_URL, LOCAL_STORAGE_TOKEN_KEY } from '../../utils/globalVars';
import InfoTooltip from '../Popup/InfoTooltip/InfoTooltip';
import beatApi from '../../utils/MoviesApi';
import PopupVideo from '../Popup/PopupVideo/PopupVideo';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? true : false,
  });
  const [device, setDevice] = useState('desktop');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});

  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);

  // testovoe
  const [apiService, setApiService] = useState({});

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > windowWidth.tablet) {
        setDevice('desktop');
      } else if (window.innerWidth > windowWidth.mobile) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    };

    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, [device]);

  useEffect(() => {
    if(currentUser.isLoggedIn) {
      checkToken();
    }
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    if (currentUser.isLoggedIn && (pathname === '/signin' || pathname === '/signup')) {
      navigate('/movies', { replace: true });
    }
  }, [pathname, navigate, currentUser.isLoggedIn]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      beatApi
        .getMovies()
        .then(setMovies)
        .catch((e) => {
          console.error(e);
        });
      api
        .getSavedMovies()
        .then((movies) => setSavedMovies(movies.data))
        .catch((e) => {
          console.error(e);
        });
    }
  }, [currentUser.isLoggedIn]);

  const checkToken = async () => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      try {
        const userInfo = await api.getUserInfo();
        setCurrentUser((prev) => ({
          ...prev,
          name: userInfo.data.name,
          email: userInfo.data.email,
          isLoggedIn: true,
        }));
      } catch (e) {
        localStorage.clear();
        setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        handleError('С токеном что-то не так. Авторизуйтесь заново.')
      }
    }
  };

  const closeAllPopups = () => {
    setInfoPopupOpen(false);
    setVideoPopupOpen(false);
    setTimeout(() => {
      setApiService((prev) => ({ ...prev, isError: false }));
    }, 200);
  };

  const enableLoader = () => {
    setApiService((prev) => ({ ...prev, isLoading: true }));
  };

  const disableLoader = () => {
    setApiService((prev) => ({ ...prev, isLoading: false }));
  };

  const handleError = (e) => {
    setApiService((prev) => ({ ...prev, isError: true, errorText: e }));
    setInfoPopupOpen(true);
  };

  const handleSearchError = () => {
    handleError('Для поиска нужно ввести запрос.');
  };

  const handleLogin = async ({ email, password }) => {
    try {
      enableLoader();
      const { token } = await api.login({ email, password });
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
      navigate('/movies', { replace: true });
    } catch (e) {
      handleError(e);
    } finally {
      disableLoader();
    }
  };
  const handleRegister = async ({ email, password, name }) => {
    try {
      enableLoader();
      const newUser = await api.register({ email, password, name });
      handleLogin({ email, password });
      setInfoPopupOpen(true);
      setApiService((prev) => ({
        ...prev,
        successText: `${newUser.name}, Вы успешно зарегистрировались.`,
      }));
    } catch (e) {
      handleError(e);
    } finally {
      disableLoader();
    }
  };
  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const handleOpenMovieTrailer = (movie) => {
    try {
      enableLoader();
      setVideoPopupOpen(true);
      setCurrentMovie(movie);
    } catch (e) {
      handleError(e);
    } finally {
      setTimeout(() => disableLoader(), 200);
    }
  };

  const handleClickSaveMovie = (movie) => {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: BEAT_API_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: BEAT_API_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    api
      .saveMovie(movieData)
      .then((savedMovie) => setSavedMovies((movies) => [...movies, savedMovie.data]))
      .catch((e) => console.error(e));
  };

  const handleClickDeleteMovie = (movieId) => {
    api
      .deleteMovie(movieId)
      .then(() => setSavedMovies((films) => films.filter((movie) => movie._id !== movieId)))
      .catch((e) => console.error(e));
  };

  const handleChangeProfileData = ({ name, email }) => {
    enableLoader();
    api
      .setUserInfo({ name, email })
      .then((userData) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          name: userData.data.name,
          email: userData.data.email,
        }));
        setInfoPopupOpen(true);
        setApiService((prev) => ({
          ...prev,
          successText: `Данные обновлены.`,
        }));
      })
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        disableLoader();
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <ApiServiceContext.Provider value={apiService}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route
                path='/'
                element={<LandingPage />}
              />
              <Route
                path='/signup'
                element={
                  <RegisterPage
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                  />
                }
              />
              <Route
                path='/signin'
                element={
                  <LoginPage
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                  />
                }
              />

              <Route element={<ProtectedRoute />}>
                <Route
                  path='/movies'
                  element={
                    <MainPage
                      movies={movies}
                      savedMovies={savedMovies}
                      onSave={handleClickSaveMovie}
                      onDelete={handleClickDeleteMovie}
                      onError={handleSearchError}
                      onTrailerClick={handleOpenMovieTrailer}
                    />
                  }
                />
                <Route
                  path='/saved-movies'
                  element={
                    <SavedMoviesPage
                      movies={savedMovies}
                      savedMovies={savedMovies}
                      onDelete={handleClickDeleteMovie}
                      onError={handleSearchError}
                      onTrailerClick={handleOpenMovieTrailer}
                    />
                  }
                />
                <Route
                  path='/profile'
                  element={
                    <ProfilePage
                      onLogout={handleLogout}
                      onSubmit={handleChangeProfileData}
                    />
                  }
                />
              </Route>

              <Route
                path='*'
                element={<NotFoundPage />}
              />
            </Routes>
          </Suspense>
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
          />
          <PopupVideo
            isOpen={isVideoPopupOpen}
            onClose={closeAllPopups}
            name={currentMovie.nameRU}
            link={currentMovie.trailerLink}
          />
        </ApiServiceContext.Provider>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
