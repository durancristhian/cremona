import { useEffect, useRef } from 'react'

export default function useInterval(
  callback: () => void,
  delay: number,
  inRunning: boolean,
) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (inRunning) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [inRunning])
}
