import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import axios from 'axios'
import contactService from './services/contactService'


const App = () => {

  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('');
  const [visiblePeople, setVisiblePeople] = useState([])

  useEffect(() => {
    contactService.getAll()
      .then(response => {
        setPersons(response)
        setVisiblePeople(response)
      })
  }, [])

  const isExistingContact = (contact) => {

    const isMatch = persons.map((person) => person.name.toUpperCase()).includes(contact.toUpperCase());

    if(isMatch === true){
      const matchingContact = persons.filter((person) => contact.toUpperCase() === person.name.toUpperCase());
      return {
        isMatch: isMatch,
        matchId: matchingContact[0].id,
      }    
    } else {
      return false;
    }
  }

  const filterContacts = (e) => {
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

    if(isExistingContact(newName).isMatch){
      alert(`${newName} already exists within contact list`)
      console.log(isExistingContact(newName).matchId)
    } else {
      contactService.create(newContact)
        .then(response => {
          setPersons(persons.concat(response))
          setVisiblePeople(persons.concat(response))
        })
    }
  };

  const deleteContact = (deletionId) => {
    contactService.deleteEntry(deletionId)
      .then(() => {
        const filteredArr = persons.filter(person => person.id !== deletionId)
        setPersons(filteredArr)
        setVisiblePeople(filteredArr)
  })
  }

  // const editContact = (id, update) => {
  //   contactService.update(id, update)
  //     .then(request => {
        
  //     })
  // }

  //if "newName" is found in persons, get the ID of the match from persons
  //pass id to edit contact, and pass updated entry

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterContacts={filterContacts} 
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
      <People visiblePeople={visiblePeople} deleteContact={deleteContact}></People>

    </div>
  )
}

export default App