import React from 'react'

import Button from './Button'

const Persons = ({ data, deleteNumber }) => {

  const handler = (id, name) => () => deleteNumber(id, name)

  return (
    <ul>
      {
        data.map(({ id, name, number }) => (
          <li key={id}>{name} {number} <Button handler={handler(id, name)} title="Delete" /></li>
        ))
      }
    </ul>
  )
}

export default Persons
