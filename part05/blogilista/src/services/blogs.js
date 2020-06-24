import axios from 'axios';

const baseUrl = '//localhost:3003/api/';
let token;

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const create = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.post(`${baseUrl}blogs/`, blog, config)
  return data
}

const getAll = async () => {
  const { data } = await axios.get(`${baseUrl}blogs/`)
  return data
}

export const login = async credentials => {
  const { data } = await axios.post(`${baseUrl}login/`, credentials)
  return data;
}

export default { create, getAll, login, setToken }
