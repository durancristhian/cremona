import { useState } from 'react'
import { Game, Option } from '../types/Game'

export default function useCremona(
  game: Game,
  onFinish: (score: number) => void,
) {
  const [state, setState] = useState({
    currentIndex: 0,
    successfulChoices: 0,
  })

  const update = (selectedOption: Option) => {
    setState((prev) => {
      const currentIndex = prev.currentIndex + 1
      const isValid =
        game.questions[prev.currentIndex].validOption === selectedOption.id
      const successfulChoices = isValid
        ? prev.successfulChoices + 1
        : prev.successfulChoices

      if (game.questions.length <= currentIndex) {
        onFinish(successfulChoices * 10)
      }

      return {
        ...prev,
        currentIndex,
        successfulChoices,
      }
    })
  }

  return {
    ...state,
    totalQuestions: game.questions.length,
    gameEnded: game.questions.length <= state.currentIndex,
    update,
  }
}
