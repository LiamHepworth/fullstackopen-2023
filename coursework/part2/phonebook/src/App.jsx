import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('');
  const [visiblePeople, setVisiblePeople] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((response) => {
        setPersons(response.data)
        setVisiblePeople(response.data)
    })
  }, [])

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
    }

    if(isExistingContact(newName)){
      alert(`${newName} already exists within contact list`)
    } else {

      axios.post("http://localhost:3001/persons", newContact)
        .then(response => {
          setPersons(persons.concat(response.data))
          setVisiblePeople(persons.concat(response.data))
        })
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