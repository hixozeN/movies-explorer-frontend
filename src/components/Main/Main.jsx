import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MovieList from './MovieList/MovieList'
import MovieSearch from './MovieSearch/MovieSearch'

const Main = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MovieSearch />
      <MovieList />
      <Footer />
    </>
  )
}

export default Main