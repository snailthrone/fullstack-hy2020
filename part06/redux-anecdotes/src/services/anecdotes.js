import axios from 'axios'

import { asObject } from '../utils'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const addAnecdote = async content => {
  const { data } = await axios.post(baseUrl, asObject(content))
  return data
}

export const vote = async anecdote => {
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return data
}