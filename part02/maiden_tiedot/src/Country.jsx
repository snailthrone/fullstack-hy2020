import React, { useEffect, useState } from 'react'
import axios from 'axios'

console.log(process.env)

const Country = (props) => {
  const { capital, flag, languages, name, population } = props
  const [show, setShow] = useState(false)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (show && !weatherData) {
      axios
        .get(`${process.env.REACT_APP_WEATHER_API_ROOT}current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${name}`)
        .then(({ data }) => {
          setWeatherData(data.current)
        })
    }
  }, [name, show, weatherData])

  const toggleCountry = () => {
    setShow(state => !state)
  }

  console.log(weatherData)

  return (
    <div>
      {
        show ? (
          <div>
            <h2>{name}</h2>
            <ul>
              <li>Capital: {capital}</li>
              <li>Population: {population}</li>
            </ul>
            <h3>Languages</h3>
            <ul>
              {languages.map(({ name }) => <li key={name}>{name}</li>)}
            </ul>
            <img alt={`${name} flag`} src={flag} style={{ maxWidth: '320px' }} />
            {
              weatherData && (
                <>
                  <h3>Weather in {name}</h3>
                  <p><strong>Temperature:</strong> {weatherData.temperature} °C</p>
                  <img alt="Weather icon" src={weatherData.weather_icons[0]}  />
                  <p><strong>Wind:</strong> {weatherData.wind_speed} km/h, direction: {weatherData.wind_dir}</p>
                </>
              )
            }
          </div>
        ) : (
          <span>{name}</span>
        )
      }
      <button onClick={toggleCountry} type="button">{show ? 'hide' : 'show'}</button>
    </div>
  )
}

export default Country
