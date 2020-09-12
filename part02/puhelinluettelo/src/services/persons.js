import axios from 'axios'

const baseUrl = '/api/persons'

const create = (person) => axios.post(baseUrl, person).then(({ data }) => data)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

const getAll = () => axios.get(baseUrl).then(({ data }) => data)

const updateNumber = (person) => axios.put(`${baseUrl}/${person.id}`, person).then(({ data }) => data)

export { create, deletePerson, getAll, updateNumber  }