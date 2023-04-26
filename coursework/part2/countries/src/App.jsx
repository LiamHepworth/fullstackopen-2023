import { useState, useEffect } from 'react'
import axios from 'axios';
import DisplayCountries from './components/DisplayCountries';

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  function handleSearch(e){
    const currentSearch = e.target.value;
    setSearch(currentSearch)
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((request) => {
        const validCountries = request.data.filter(country => country.name.official.toUpperCase().includes(search.toUpperCase()))
        setCountries(validCountries)
      })
  }, [search]);

  return (
    <div>
      <h2>Find Countries</h2>
      <form>
        <input 
          value={search} 
          onChange={(e) => {handleSearch(e)}
          }/>
      </form>

      <div>
        {countries.length < 10 ?
          <DisplayCountries countries={countries} />
        : 
          <span>Too many countries, refine search</span>
        }
      </div>

    </div>
  )
}

export default App
