import React, { useState } from 'react'

import Form from './Form'
import InputField from './InputField'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const personFound = persons.some(({ name }) => name === newName);

    if (personFound) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons((state) => state.concat({ name: newName, number: newNumber }))
    }
  }

  const updateName = ({ target }) => {
    setNewName(target.value)
  }

  const updateNumber = ({ target }) => {
    setNewNumber(target.value)
  }

  const updateSearchValue = ({ target }) => {
    setSearch(target.value)
  }

  const formProps = {
    fields: [
      {
        handler: updateName,
        label: 'Name',
        value: newName
      },
      {
        handler: updateNumber,
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
      <h2>Numbers</h2>
      <Persons data={showPersons} />
    </div>
  )

}

export default App