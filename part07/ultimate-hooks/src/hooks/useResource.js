import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const create = async resource => {
    const { data } = await axios.post(baseUrl, resource)
    setResources(resources => [...resources, data])
  }

  const get = useCallback(async () => {
    const { data } = await axios.get(baseUrl)
    setResources(data)
  }, [baseUrl])

  useEffect(() => {
    get()
  }, [baseUrl, get])

  return [resources, { create }]
}

export default useResource
