import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Liam Moses' },
  ]) 
  const [newName, setNewName] = useState('')

  const addNewContact = (event) => {
    event.preventDefault()

    const newContact = {
      name: newName,
    }

    if(persons.map((person) => person.name).includes(newName)){
      alert(`${newName} already exists within contact list`)
    } else {
      setPersons(persons.concat(newContact))      
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewContact}>
        <div>name: <input value={newName} onChange={e => setNewName(e.target.value)}/> </div>  
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App