import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Landing from '../Landing/Landing';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  const handleLogin = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }))
    navigate('/movies', { replace: true });
  };
  const handleRegister = () => {
    navigate('/signin');
  };
  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }))
    navigate('/', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={<Landing />}
        />
        <Route
          path='/movies'
          element={<Main />}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies />}
        />
        <Route
          path='/profile'
          element={<Profile onLogout={handleLogout} />}
        />
        <Route
          path='/signup'
          element={
            <Register
              onLogin={handleLogin}
              onRegister={handleRegister}
            />
          }
        />
        <Route
          path='/signin'
          element={
            <Login
              onLogin={handleLogin}
              onRegister={handleRegister}
            />
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
