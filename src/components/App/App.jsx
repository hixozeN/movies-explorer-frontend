import { Route, Routes, useNavigate } from 'react-router-dom';
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

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [device, setDevice] = useState('desktop');

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

  const handleLogin = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
    navigate('/movies', { replace: true });
  };
  const handleRegister = () => {
    navigate('/signin');
  };
  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    navigate('/', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route
              path='/'
              element={<LandingPage />}
            />
            <Route
              path='/movies'
              element={<MainPage />}
            />
            <Route
              path='/saved-movies'
              element={<SavedMoviesPage />}
            />
            <Route
              path='/profile'
              element={<ProfilePage onLogout={handleLogout} />}
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
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </Suspense>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
