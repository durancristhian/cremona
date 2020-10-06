import { useDocument } from '@nandorojo/swr-firestore'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { LoggedOut } from '../..'
import Countdown from '../../../components/Countdown'
import useAudio from '../../../hooks/useAudio'
import { useAuth, useUser } from '../../../hooks/useAuth'
import useCremona from '../../../hooks/useCremona'
import useInterval from '../../../hooks/useInterval'
import CheckCircle from '../../../icons/CheckCircle'
import XCircle from '../../../icons/XCircle'
import { Game, Option } from '../../../types/Game'
import { Player } from '../../../types/Player'
import A from '../../../ui/A'
import Button from '../../../ui/Button'
import Heading from '../../../ui/Heading'
import { PlayingStatus } from '../[gameId]'

export default function PlayerId() {
  const { user } = useAuth()

  return user ? <Content /> : <LoggedOut />
}

const Content = () => {
  const user = useUser()
  const router = useRouter()
  const gameId = Array.isArray(router.query.gameId)
    ? router.query.gameId[0]
    : router.query.gameId
  const playerId = Array.isArray(router.query.playerId)
    ? router.query.playerId[0]
    : router.query.playerId

  const { data: game, error, loading } = useDocument<Game>(
    gameId ? `challenges/${gameId}` : null,
    {
      parseDates: ['createdAt'],
      listen: true,
    },
  )
  const {
    data: player,
    error: errorPlayer,
    loading: loadingPlayer,
    update,
  } = useDocument<Player>(
    playerId ? `challenges/${gameId}/players/${playerId}` : null,
    {
      listen: true,
    },
  )

  if (loading || loadingPlayer) {
    return <p className="italic text-center">Loading...</p>
  }

  if (error || errorPlayer) {
    return <p className="italic text-center">There was an error.</p>
  }

  if (!game || !player) {
    return (
      <p className="italic text-center">There is no challenge or player.</p>
    )
  }

  if (user.uid !== player.userId) {
    return (
      <p className="italic text-center">
        The user does not match with the player.
      </p>
    )
  }

  if (player.status === 'finished') {
    /* TODO: verify game and player status */
    /* return <PlayerScore /> */
    return (
      /* TODO: make a component */
      <>
        <p className="flex flex-col items-center justify-center">
          <span>You finished</span>
          <span className="text-6xl font-bold mx-4">
            {player.score.toLocaleString()}
          </span>
          <span>with points</span>
        </p>
        <div className="mt-8 text-center">
          <Link href="/games/[gameId]" as={`/games/${gameId}`} passHref>
            <A href="#!">Go back to challenge</A>
          </Link>
        </div>
      </>
    )
  }

  const onFinish = (score: number) => {
    console.log(score)

    update({
      status: 'finished',
      score,
    })
  }

  return (
    <>
      {player.status === 'playing' ? (
        <PlayerGame game={game} onFinish={onFinish} />
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <Heading type="h1">{game.name}</Heading>
          </div>
          <Button
            onClick={() => {
              update({
                status: 'playing',
              })
            }}
          >
            Ready to play
          </Button>
        </div>
      )}
    </>
  )
}

type PlayerGameProps = {
  game: Game
  onFinish: (score: number) => void
}

function PlayerGame({ game, onFinish }: PlayerGameProps) {
  const { currentIndex, gameEnded, totalQuestions, update } = useCremona(
    game,
    onFinish,
  )
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const { toggle: playError } = useAudio('/sounds/error.mp3', 0.2)
  const { toggle: playSuccess } = useAudio('/sounds/success.mp3', 0.9)
  const { toggle: toggleBackground } = useAudio('/sounds/background.mp3', 0.1)
  const [showNext, setShowNext] = useState(false)
  const [ms, setMs] = useState(0)

  useInterval(
    () => {
      setMs(ms + 100)
    },
    100,
    !showNext,
  )

  const currentQuestion = game.questions[currentIndex]

  if (gameEnded) return null

  return (
    <div className="mx-auto max-w-2xl w-full">
      <p className="mt-4 text-center italic">
        {currentIndex + 1} of {totalQuestions}
      </p>
      <div className="mb-4">
        <Heading type="h2">{currentQuestion.description}</Heading>
      </div>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option.id} className="py-2">
            <button
              className={classnames([
                'flex px-4 py-2 bg-white border w-full text-left h-16 items-center',
                showNext &&
                  currentQuestion.validOption === option.id &&
                  'bg-green-300',
                showNext &&
                  currentQuestion.validOption !== option.id &&
                  'bg-red-300',
                showNext && option.id !== selectedOption?.id && 'opacity-50',
              ])}
              onClick={() => {
                setSelectedOption(option)
                setShowNext(true)

                toggleBackground()

                if (currentQuestion.validOption === option.id) {
                  playSuccess()
                } else {
                  playError()
                }
              }}
              disabled={!!selectedOption}
            >
              {showNext && currentQuestion.validOption === option.id && (
                <CheckCircle className="h-6 mr-4" />
              )}
              {showNext && currentQuestion.validOption !== option.id && (
                <XCircle className="h-6 mr-4" />
              )}
              <span>{option.content}</span>
            </button>
          </li>
        ))}
      </ul>
      {showNext && (
        <div className="mt-4 text-right">
          <Button
            onClick={() => {
              update(selectedOption, ms)
              setSelectedOption(null)
              setShowNext(false)
            }}
          >
            {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      )}
      {!showNext && (
        <div className="mt-4">
          <Countdown
            time={currentQuestion.time}
            onStart={() => {
              toggleBackground()
            }}
            onFinish={() => {
              toggleBackground()
              playError()
              setSelectedOption(null)
              setShowNext(true)
            }}
          />
        </div>
      )}
      <div className="mt-8">
        <PlayingStatus gameId={game.id} />
      </div>
    </div>
  )
}
