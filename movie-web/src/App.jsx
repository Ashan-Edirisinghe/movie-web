import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './componets/search.jsx'
 const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
