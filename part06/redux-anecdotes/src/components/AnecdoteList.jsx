import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = ({ content, id }) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(notify(`You voted '${content}'`))
  }

  console.log(filter)

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
