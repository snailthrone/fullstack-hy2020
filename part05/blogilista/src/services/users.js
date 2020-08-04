import axios from 'axios'

import { baseUrl } from './common'

export const login = async credentials => {
  const { data } = await axios.post(`${baseUrl}login/`, credentials)
  return data
}

export const get = async () => {
  const { data } = await axios.get(`${baseUrl}users/`)
  return data
}
