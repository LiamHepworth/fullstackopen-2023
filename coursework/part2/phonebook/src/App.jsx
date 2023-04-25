import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import contactService from './services/contactService'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('');
  const [visiblePeople, setVisiblePeople] = useState([])

  const [successMsg, setSuccessMsg] = useState('Help')
  const [showMsg, setShowMsg] = useState(false)
  const handleMessage = (msg) => {
    setShowMsg(true)
    setSuccessMsg(msg)
    setTimeout(() => {
      setShowMsg(false)
      setSuccessMsg(null)
    }, 5000)
  }

  useEffect(() => {
    contactService.getAll()
      .then(response => {
        setPersons(response)
        setVisiblePeople(response)
      })
  }, []);

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
  };

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
  };

  const addNewContact = (event) => {
    event.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber,
    }

    if(isExistingContact(newName).isMatch){
      if(confirm(`${newName} already exists within contact list, update number?`)){
        editContact(isExistingContact(newName).matchId, newContact)
        handleMessage(`${newName} has been updated.`)
      } else {
        handleMessage(`Operation cancelled`)
        return
      }
    } else {
      contactService.create(newContact)
      .then(response => {
        setPersons(persons.concat(response))
        setVisiblePeople(persons.concat(response))
      })
      handleMessage(`${newName} has been added to your contact list`)
    }
  };

  const editContact = (id, update) => {
    contactService.update(id, update)
      .then(function (response) {
        const updatedArr = persons.map(person => person.id === id ? response : person)
        setPersons(updatedArr)
        setVisiblePeople(updatedArr)
      })
  };

  const deleteContact = (deletionId) => {
    contactService.deleteEntry(deletionId)
      .then(() => {
        const filteredArr = persons.filter(person => person.id !== deletionId)
        setPersons(filteredArr)
        setVisiblePeople(filteredArr)
  })
    const deletedContact = persons.find(person => person.id === deletionId)
    handleMessage(`${deletedContact.name} has been removed from your contact list`)
  };

  return (
    <div>
      {showMsg ? <Notification message={successMsg}></Notification> : <span/>}

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