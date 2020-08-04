import axios from 'axios'

import { baseUrl } from './common'

let token

export const create = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.post(`${baseUrl}blogs/`, blog, config)
  return data
}

export const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  return await axios.delete(`${baseUrl}blogs/${id}`, config)
}

export const get = async () => {
  const { data } = await axios.get(`${baseUrl}blogs/`)
  return data
}

export const like = async blog => {
  const { data } = await axios.put(`${baseUrl}blogs/${blog.id}`, blog)
  return data
}

export const setToken = newToken => {
  token = `bearer ${newToken}`
}
