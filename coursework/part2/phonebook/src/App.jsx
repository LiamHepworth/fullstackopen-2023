import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('');
  const [visiblePeople, setVisiblePeople] = useState(persons)

  const isExistingContact = (contact) => {
    return persons.map((person) => person.name).includes(contact);
  }

  const displayContacts = (e) => {
    e.preventDefault();

    if(isExistingContact(search)){
      setVisiblePeople(persons.filter(person => person.name === search))
    } else {
      setVisiblePeople(persons)
      if(search !== ""){
        alert("contact not found")
      }
    }
  }

  const addNewContact = (event) => {
    event.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if(isExistingContact(newName)){
      alert(`${newName} already exists within contact list`)
    } else {
      setPersons(persons.concat(newContact));
      setVisiblePeople(persons.concat(newContact));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={displayContacts}>
        <div>Search: <input value={search} onChange={e => setSearch(e.target.value)}/> </div>
        <div><button type="submit">lookup</button></div>      
      </form>


      <h2>Add A Contact</h2>
      <form onSubmit={addNewContact}>
        <div>name: <input value={newName} onChange={e => setNewName(e.target.value)}/> </div>
        <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/></div>  
        <div><button type="submit">add</button></div>
      </form>

      <h2>Contacts</h2>
      <ul>
        {visiblePeople.map((person) => (
          <li key={person.id}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App