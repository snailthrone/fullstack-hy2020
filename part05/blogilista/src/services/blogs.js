import axios from 'axios'

import { baseUrl } from './common'

export const create = async (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const { data } = await axios.post(`${baseUrl}blogs/`, blog, config)
  return data
}

export const remove = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
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

