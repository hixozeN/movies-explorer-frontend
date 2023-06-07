import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MovieList from './MovieList/MovieList'
import MovieSearch from './MovieSearch/MovieSearch'

const Main = () => {
  return (
    <>
      <Header />
      <MovieSearch />
      <MovieList />
      <Footer />
    </>
  )
}

export default Main