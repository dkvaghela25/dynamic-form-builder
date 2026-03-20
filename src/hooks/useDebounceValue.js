import { useEffect, useState } from "react"

export const useDebounceValue = (input, delay = 100) => {

  const [debounceValue, setDebounceValue] = useState(input)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(input)
    }, delay)
    return () => clearTimeout(id);
  }, [delay, input])

  return debounceValue;
}
