import React from 'react';

const TrendCard = ({ movie }) => {

  return (
    <div className="movie-card">
      <img
        src={movie.movieImg ?
          `https://image.tmdb.org/t/p/w200${movie.movieImg}` : '/no-movie.png'}
        alt={movie.movieTitle}
        style={{ width: '150px', height: 'auto' }}
      />

      <div className="mt-4">
        <h3>{movie.movieTitle}</h3>
        <p className="text-sm">Searches: {movie.count}</p>
      </div>
    </div>
  )
}

export default TrendCard;