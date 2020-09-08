import { useState } from 'react'
import { Game, Option } from '../types/Game'

export default function useCremona(
  game: Game,
  onFinish: (score: number) => void,
) {
  const [state, setState] = useState({
    currentIndex: 0,
    successfulChoices: 0,
    timeAwards: 0,
  })

  const update = (selectedOption: Option | null, ms: number) => {
    setState((prev) => {
      const currentIndex = prev.currentIndex + 1
      const isValid = selectedOption
        ? game.questions[prev.currentIndex].validOption === selectedOption.id
        : false
      const successfulChoices = isValid
        ? prev.successfulChoices + 1
        : prev.successfulChoices

      /* 1. Divide response time by the question timer. For example, a player responded 2 seconds after a 30-second question timer started. 2 divided by 30 is 0.0667. */
      const s = ms / 1000
      const step1 = s / game.questions[prev.currentIndex].time

      /* 2. Divide that value by 2. For example, 0.0667 divided by 2 is 0.0333. */
      const step2 = step1 / 2

      /* 3. Subtract that value from 1. For example, 1 minus 0.0333 is 0.9667. */
      const step3 = 1 - step2

      /* 4. Multiply points possible by that value. For example, 1000 points possible multiplied by 0.9667 is 966.7. */
      const step4 = step3 * 1000

      /* 5. Round to the nearest whole number. For example, 966.7 is 967 points. */
      const step5 = Math.round(step4)

      const currentQuestionTimeAward = prev.timeAwards + (isValid ? step5 : 0)

      if (game.questions.length <= currentIndex) {
        onFinish(successfulChoices * 1000 + currentQuestionTimeAward)
      }

      return {
        ...prev,
        currentIndex,
        successfulChoices,
        timeAwards: currentQuestionTimeAward,
      }
    })
  }

  return {
    ...state,
    gameEnded: game.questions.length <= state.currentIndex,
    totalQuestions: game.questions.length,
    update,
  }
}
