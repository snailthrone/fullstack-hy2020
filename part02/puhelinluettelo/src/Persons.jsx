import React from 'react'

const Persons = ({ data }) => {
  return (
    <ul>
      {
        data.map(({ name, number }) => (
          <li key={name}>{name} {number}</li>
        ))
      }
    </ul>
  )
}

export default Persons
