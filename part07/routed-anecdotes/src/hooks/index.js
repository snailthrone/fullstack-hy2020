import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = ({ target: { value }}) => setValue(value)

  const reset = () => setValue('')

  return { type, value, onChange, reset  }
}
