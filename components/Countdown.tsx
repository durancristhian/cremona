import React, { useState } from 'react'
import useInterval from '../hooks/useInterval'

type Props = {
  time: number
  onFinish: () => void
}

const Countdown = ({ time, onFinish }: Props) => {
  const [translateLeft, setTranslateLeft] = useState(100)
  const [finished, setFinished] = useState(false)
  const step = 100 / time

  useInterval(
    () => {
      let nextTranslateLeft = Math.round(translateLeft - step)

      if (nextTranslateLeft < 0) {
        nextTranslateLeft = 0

        onFinish()
        setFinished(true)
      }

      setTranslateLeft(nextTranslateLeft)
    },
    1000,
    !finished,
  )

  return (
    <div className="bg-white h-4 relative shadow overflow-hidden">
      <div
        className="absolute bg-red-500 left-0 bottom-0 top-0 w-full h-full transition-transform duration-1000 ease-linear"
        style={{
          transform: `translateX(-${translateLeft}%)`,
        }}
      ></div>
    </div>
  )
}

export default Countdown
