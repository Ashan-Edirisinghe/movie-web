import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './componets/search.jsx'


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const getMovies = async (query) => {

  try{} catch(error){
    console.error('Error fetching movies:', error);
  }

}

 const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( () => {
    console.log(import.meta.env.VITE_TMDB_API_KEY);
  }, [])




  return(
     <main>
      <div className='pattern'  /> 

      <div className='wrapper'>
       
        <header>

          <img src='hero.png' />
          <h1> Experience <span className='text-gradient'> Magic</span>  of Cinema</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
      </div>
     </main>
  )
 }

export default App
