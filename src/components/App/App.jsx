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
import { LOCAL_STORAGE_TOKEN_KEY } from '../../utils/globalVars';
import InfoTooltip from '../Popup/InfoTooltip/InfoTooltip';
import beatApi from '../../utils/MoviesApi';
import { MoviesContext } from '../../contexts/MoviesContext/MoviesContext';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? true : false,
  });
  const [device, setDevice] = useState('desktop');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

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
    checkToken();
  }, []);

  useEffect(() => {
    if (currentUser.isLoggedIn && (pathname === '/signin' || pathname === '/signup')) {
      navigate('/movies', { replace: true });
    }
  }, [pathname, navigate, currentUser.isLoggedIn]);

  // useEffect(() => {
  //   currentUser.isLoggedIn && fetchMovieList();
  // }, [currentUser.isLoggedIn])

  // const fetchMovieList = async () => {
  //   try {
  //     const movies = await beatApi.getMovies();
  //     setMovieList([...movies]);
  //     console.log("отработал фетч фильмов")
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      beatApi.getMovies()
        .then(setMovies)
        .catch((e) => {
          console.error(e);
        })
      api.getSavedMovies()
        .then((movies) => setSavedMovies(movies.data))
        .catch((e) => {
          console.error(e);
        })
    }
  }, [currentUser.isLoggedIn])

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
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        console.error(e);
      }
    }
  };

  const closeAllPopups = () => {
    setInfoPopupOpen(false);
    setApiService((prev) => ({ ...prev, isError: false }));
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
      handleLogin({ email, password })
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
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    navigate('/', { replace: true });
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
                  element={<MainPage movies={movies} savedMovies={savedMovies} />}
                />
                <Route
                  path='/saved-movies'
                  element={<SavedMoviesPage />}
                />
                <Route
                  path='/profile'
                  element={<ProfilePage onLogout={handleLogout} />}
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
        </ApiServiceContext.Provider>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
