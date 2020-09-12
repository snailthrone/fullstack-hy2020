import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = anecdote => {
    const { content, id } = anecdote
    console.log('vote', id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${content}'`, 10))
  }

  return (
    <>
      {
        anecdotes.map(anecdote =>
          {
            if (anecdote.content.includes(filter)) {
              return (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button></div>
                </div>
              )
            }
            return false
          }
        )
      }
    </>
  )
}

export default AnecdoteList
