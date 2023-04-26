import { useState, useEffect } from 'react'
import axios from 'axios';

  //use useEffect() to query the API each time the search field is updated??
  //loop through name values of API
  //check if countryName.includes(search) - if true {
  //   return the first 10 countries to match search query
  // }
  //When only one name matches, get all country data for it

  //request.data[i].name.official
  //use filter to filter against search query

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(["switzerland", "swiss"])

  function handleSearch(e){
    const currentSearch = e.target.value;
    setSearch(currentSearch)
  }

  useEffect(() => {
    console.log(search);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((request) => {
        // console.log(request.data.filter(country => country.name.official.includes(search)))
        const validCountries = request.data.filter(country => country.name.official.includes(search))
        console.log(validCountries)

        if(validCountries.length <= 10){
          setCountries(validCountries)
          console.log("less than ten")
          console.log(validCountries[0].name.official)
        } else {
          setCountries(["too many"])
          console.log("more than ten")
        }
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

      {/* {countries.length < 10 ? 
        <ul>
          {countries.map((country) => (
            <li>{country.name.official}</li>
          ))}
        </ul>
        :
        <span>too many countries</span>
      } */}

    </div>
  )
}

export default App
