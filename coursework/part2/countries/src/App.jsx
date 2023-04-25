import { useState } from 'react'

function App() {

  const [search, setSearch] = useState('')

  function handleSearch(e){
    const currentSearch = e.target.value;
    setSearch(currentSearch)
  }

  //use useEffect() to query the API each time the search field is updated??

  return (
    <div>
      <h2>Find Countries</h2>
      <form>
        <input 
          value={search} 
          onChange={(e) => {handleSearch(e)}
          }/>
      </form>
    </div>
  )
}

export default App
