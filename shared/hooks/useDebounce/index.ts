import { useRef } from 'react'

export default function useDebounce(fn: any, ms: any) {
  const timeOut = useRef()
  return function (...args: any) {
    const fnCall = () => fn.apply(null, args)
    clearTimeout(timeOut.current)
    // @ts-expect-error: Type 'Timeout' is not assignable to type 'undefined'
    timeOut.current = setTimeout(fnCall, ms)
  }
}
