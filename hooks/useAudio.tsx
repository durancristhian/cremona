import { useEffect, useState } from 'react'

const useAudio = (url: string, volume = 0.5) => {
  const sound = new Audio(url)
  sound.volume = volume

  const [audio] = useState(sound)
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    if (playing) {
      audio.play()
    } else {
      audio.currentTime = 0
      audio.pause()
    }
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))

    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return { playing, toggle }
}

export default useAudio
