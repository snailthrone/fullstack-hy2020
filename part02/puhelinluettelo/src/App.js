import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Form from './Form'
import InputField from './InputField'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(({ data }) => {
      console.log(data)
      setPersons(data)
    })
  }, [])

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
      {
        showPersons && (
          <>
            <h2>Numbers</h2>
            <Persons data={showPersons} />
          </>
        )
      }
    </div>
  )

}

export default App