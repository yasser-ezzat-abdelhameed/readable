import { useState } from 'react'

/**
 * useFormInput custom hook
 * @param {string} initialValue 
 */
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue || '')
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange
  }
}

export default useFormInput
