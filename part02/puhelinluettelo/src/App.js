import React, { useEffect, useState } from 'react'

// Components
import Form from './Form'
import InputField from './InputField'
import Persons from './Persons'

// Services
import { create, deletePerson, getAll, updateNumber } from './services/persons'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAll().then(data => {
      setPersons(data)
    })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const personFound = persons.find(({ name }) => name === newName);
    if (personFound) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber({ ...personFound, number: newNumber }).then(person => setPersons((state) => state.concat(person)))
      }
    } else {
      create({ name: newName, number: newNumber }).then(person => setPersons((state) => state.concat(person))) 
    }
  }

  const deleteNumber = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then(() => setPersons((state) => state.filter((person) => person.id !== id)))
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