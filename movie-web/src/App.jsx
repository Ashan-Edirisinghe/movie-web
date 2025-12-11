import { useState , useEffect} from 'react'
import { useDebounce } from 'react-use'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './componets/search.jsx'
import Card from './componets/card.jsx'


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

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

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

  useEffect(() => {
    console.log('Component mounted, fetching movies...');
    getMovies(debouncedSearchTerm);
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
