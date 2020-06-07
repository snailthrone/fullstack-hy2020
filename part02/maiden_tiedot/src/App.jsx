import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './Countries'

const App = () => {
  const [countryData, setCountryData] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(({ data }) => {
      setCountryData(data)
    })
  }, [])

  const updateSearch = ({ target }) => {
    setSearch(target.value)
  }

  console.log(countryData)

  if (countryData) {
    const showCountries = search !== '' ? countryData.filter(({ name }) => (name.toLowerCase().match(search.toLowerCase()))) : []
    return (
      <>
        <div>
          Find countries:
          {' '}
          <input onChange={updateSearch} type="text" value={search} />
          {
            <Countries data={showCountries} />
          }
        </div>
      </>
    )
  }
  return <p>Ladataan...</p>
}

export default App
