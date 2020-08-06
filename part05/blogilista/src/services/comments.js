import axios from 'axios'

import { baseUrl } from './common'

export const create = async (blog, content, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  const { data } = await axios.post(`${baseUrl}comments/`, { blog, content }, config)
  return data
}