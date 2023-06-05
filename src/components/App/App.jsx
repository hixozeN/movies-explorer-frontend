import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from '../Landing/Landing';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

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
          element={<Main />}
        />
        <Route
          path='/signin'
          element={<Main />}
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
