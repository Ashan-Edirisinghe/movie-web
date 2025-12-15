import { useState , useEffect} from 'react'
import { useDebounce } from 'react-use'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './componets/search.jsx'
import Card from './componets/card.jsx'
import TrendCard from './componets/trendCard.jsx'
import { addRank, findMovieByTitle, updateRankCount, getTopRanks } from './api/ranks.js'
 


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

 const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [rankedMovie, setRankedMovie] = useState(null);

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 2000, [searchTerm])

  const getMovies = async (query) => {
    setIsLoading(true);

    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                             : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if(data.results && data.results.length > 0){
        setMovieList(data.results);
        if(query){ 
        rankingMovies(data.results[0]);
        }
      } else {
        console.log('No movies found');
        setMovieList([]);
      }

    } catch(error){
      console.error('Error fetching movies:', error);
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  }

  /* Ranking card function*/
   const getTrends = async () => {
    try{
      console.log('Fetching top trends...');
      const topRanks = await getTopRanks();
      console.log('Top ranks received:', topRanks);
      
      if(topRanks && topRanks.length > 0) {
        setRankedMovie(topRanks);
        console.log('Ranked movies set:', topRanks.length);
      } else {
        console.log('No ranked movies found');
        setRankedMovie([]);
      }

    }catch(err){
      console.error('Error fetching top ranks:', err);
      setRankedMovie([]);
    }
   }
 
   /* ranking movies */
 const rankingMovies = async (Movie) => {
   try{
    const foundMovie = await findMovieByTitle(Movie.title);
    if(!foundMovie){
     const addMovie = await addRank({
        movieTitle: Movie.title,
        movieId: Movie.id,
        movieImg: Movie.poster_path,
        count: 1
      });

      console.log('Added new movie to ranks:', addMovie);
        
     
    }else{
      const newCount = foundMovie.count + 1;
      console.log('Updating movie:', foundMovie.movieId, 'to count:', newCount);

      const updated = await updateRankCount(foundMovie.movieId, newCount);
      console.log('Updated movie count:', updated);
    } 

   }catch(err){
     console.error('Ranking error:', err);
   }

 }


  useEffect(() => {
    console.log('Component mounted, fetching movies...');
    getMovies(debouncedSearchTerm);
    getTrends();
  }, [debouncedSearchTerm]);


 




  return(
     <main>
      <div className='pattern'  /> 

      <div className='wrapper'>
       
        <header>

          <img src='hero.png' />
          <h1> Experience <span className='text-gradient'> Magic</span>  of Cinema</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

         
        <section className='movie-list'>
          <h2>Trending Searches</h2>
          {!rankedMovie ? (
            <p>Loading trends...</p>
          ) : rankedMovie.length === 0 ? (
            <p>No trending movies yet. Search for some movies!</p>
          ) : (
            <section className='all-movies'>
              <ul> 
                            {rankedMovie.map((movie)=>( 
              <TrendCard key={movie._id} movie={movie} />
            ))}

            </ul>
            </section>

          )}
        </section>

        <section className='movie-list'> 
          <h2>All Movies</h2>
          {isLoading ? (
            <p>Loading movies...</p>
          ):
          ( <>
             <section className='all-movies'>
            <ul>
              {MovieList.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))} 
            </ul>
          </section>
            </>
          )}
        </section>
        
      </div>
     </main>
  )
 }

export default App
