import React, { useEffect, useState } from 'react'
import useInterval from '../hooks/useInterval'

type Props = {
  time: number
  onFinish: () => void
  onStart: () => void
}

const round = (n: number) => Number(n.toFixed(5))

const Countdown = ({ time, onFinish, onStart }: Props) => {
  const [translateLeft, setTranslateLeft] = useState(100)
  const step = round(100 / time)
  const [times, setTimes] = useState(time)

  useEffect(() => {
    if (times === time) {
      onStart()
    }
  }, [times])

  useInterval(
    () => {
      const nextTranslateLeft = round(translateLeft - step)
      setTranslateLeft(nextTranslateLeft)

      const nextTimes = times - 1
      setTimes(nextTimes)

      if (!nextTimes) {
        onFinish()
      }
    },
    1000,
    times > -1,
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
