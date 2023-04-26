import { useState, useEffect } from 'react'
import axios from 'axios';

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
          <ul>
            {countries.map((country) => (
              <li key={countries.indexOf(country)}>{country.name.common}</li>
            ))}
          </ul>
          :
          <span>Too many countries, refine search</span>
        }
        </div>

    </div>
  )
}

export default App
