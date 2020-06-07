import React from 'react'

import Country from './Country'

const Countries = ({ data }) => {
  if (data.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (data.length === 1) {
    return <Country {...data[0]} />
  }
  else {
    return (
      <div>
        {
          data.map((c) => <Country {...c} key={c.name} />)
        }
      </div>
    )
  }
}

export default Countries
