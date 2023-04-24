import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'

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
    return persons.map((person) => person.name.toUpperCase()).includes(contact.toUpperCase());
  }

  const displayContacts = (e) => {
    e.preventDefault();

    if(isExistingContact(search)){
      setVisiblePeople(persons.filter(person => person.name.toUpperCase() === search.toUpperCase()))
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
      <Filter 
        displayContacts={displayContacts} 
        search={search} 
        setSearch={setSearch}>
      </Filter>

      <h2>Add A Contact</h2>
      <PersonForm
        addNewContact={addNewContact}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      ></PersonForm>

      <h2>Contacts</h2>
      <People visiblePeople={visiblePeople}></People>

    </div>
  )
}

export default App