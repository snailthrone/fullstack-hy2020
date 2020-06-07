import React, { useEffect, useState } from 'react'

// Components
import Form from './Form'
import InputField from './InputField'
import Notification from './Notification'
import Persons from './Persons'

// Services
import { create, deletePerson, getAll, updateNumber } from './services/persons'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getAll().then(data => {
      setPersons(data)
    })
  }, [])

  useEffect(() => {
    if (message) {
      const messageRemove = setTimeout(() => setMessage(null), 5000)

      return () => clearTimeout(messageRemove)
    }
  }, [message, setMessage])

  const addNewPerson = (event) => {
    event.preventDefault()
    const personFound = persons.find(({ name }) => name === newName);
    if (personFound) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber({ ...personFound, number: newNumber }).then(person => {
          setPersons((state) => state.map((p) => p.id === person.id ? person : p))
          setMessage({ message: `Updated ${newName}'s number on the phonebook.`, state: 'success' })
        }).catch(error => {
          console.log(error.message)
          setMessage({ message: 'An error occured', state: 'error' })
        })
      }
    } else {
      create({ name: newName, number: newNumber }).then(person => {
        setPersons((state) => state.concat(person))
        setMessage({ message: `Added ${newName} to phonebook.`, state: 'success' })
      }).catch(error => {
        console.log(error.message)
        setMessage({ message: 'An error occured', state: 'error' })
      })
    }
  }

  const deleteNumber = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then(() => {
        setPersons((state) => state.filter((person) => person.id !== id))
        setMessage({ message: `Deleted ${name} from the phonebook.`, state: 'success' })
      }).catch(error => {
        console.log(error.message)
        setMessage({ message: `${name} has already been removed from server.`, state: 'error' })
      })
    }
  }

  const updateNameField = ({ target }) => setNewName(target.value)
  
  const updateNumberField = ({ target }) => setNewNumber(target.value)

  const updateSearchValue = ({ target }) => setSearch(target.value)

  const formProps = {
    fields: [
      {
        handler: updateNameField,
        label: 'Name',
        value: newName
      },
      {
        handler: updateNumberField,
        label: 'Number',
        value: newNumber
      }
    ],
    submit: {
      handler: addNewPerson,
      title: 'Add'
    }
  }

  const showPersons = search === '' ? persons : persons.filter(({ name, number }) => (
    name.toLowerCase().match(search.toLowerCase()) || number.toLowerCase().match(search.toLowerCase()) 
  ))

  return (
    <div>
      <h1>Phonebook</h1>
      {
        message && (
          <Notification {...message} />
        )
      }
      <InputField label="Search person or number" handler={updateSearchValue} value={search} />
      <h2>Add a new</h2>
      <Form {...formProps} />
      {
        showPersons && (
          <>
            <h2>Numbers</h2>
            <Persons data={showPersons} deleteNumber={deleteNumber} />
          </>
        )
      }
    </div>
  )

}

export default App