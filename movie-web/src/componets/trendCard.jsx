import react from 'react';

const Card = ({ movie:
    { title,poster_path }
 }) => {

return (
     <div className="movie-card">
      <img
        src={poster_path ?
          `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />

      <div className="mt-4">
        
        <h3>{title}</h3>
          
      </div>
    </div>
)

}

export default Card;