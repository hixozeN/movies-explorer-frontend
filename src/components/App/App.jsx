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

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/movies', { replace: true });
  }
  const handleRegister = () => {
    navigate('/signin');
  }

  return (
    <>
      <Routes>
      <Route
          path='/'
          element={<Landing isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='/movies'
          element={<Main isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/signup'
          element={<Register onLogin={handleLogin} onRegister={handleRegister} />}
        />
        <Route
          path='/signin'
          element={<Login onLogin={handleLogin} onRegister={handleRegister} />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

export default App;
