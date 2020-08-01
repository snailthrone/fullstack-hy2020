import React from 'react'
import { useDispatch } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { value } = event.target
    dispatch(filterChange(value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter
