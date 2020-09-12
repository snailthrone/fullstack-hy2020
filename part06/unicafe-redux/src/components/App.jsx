import React from 'react'
import { createStore } from 'redux'

import counterReducer from '../reducers/counterReducer'

export const store = createStore(counterReducer)

const App = () => {
  const good = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const neutral = () => {
    store.dispatch({ type: 'OK' })
  }

  const bad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={good}>Good</button> 
      <button onClick={neutral}>Neutral</button> 
      <button onClick={bad}>Bad</button>
      <button onClick={reset}>Reset stats</button>
      <div>Good: {store.getState().good}</div>
      <div>Neutral: {store.getState().ok}</div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  )
}

export default App
