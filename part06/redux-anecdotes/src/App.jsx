import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { initAnecdotes } from './reducers/anecdoteReducer'

import { getAll } from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    getAll().then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  }, [dispatch])
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
