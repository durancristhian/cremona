import { fuego, useCollection, useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Game } from '../../types/Game'
import { Player } from '../../types/Player'
import Button from '../../ui/Button'
import Heading from '../../ui/Heading'

const GameId = () => {
  const router = useRouter()
  const gameId = Array.isArray(router.query.gameId)
    ? router.query.gameId[0]
    : router.query.gameId
  const { data: game, error, loading, update } = useDocument<Game>(
    gameId ? `challenges/${gameId}` : null,
    {
      parseDates: ['createdAt'],
      listen: true,
    },
  )
  const { user } = useAuth()

  if (loading) {
    return <p className="italic text-center">Loading...</p>
  }

  if (error) {
    return <p className="italic text-center">There was an error.</p>
  }

  if (!game || !game.id) {
    return <p className="italic text-center">There is no challenge.</p>
  }

  const isAdmin = game.createdBy === user?.uid

  const nextState = () => {
    const nextStatus =
      game.status === 'created'
        ? 'playing'
        : game.status === 'playing'
        ? 'finished'
        : 'created'

    update({
      status: nextStatus,
    })
  }

  return (
    <>
      <div className="bg-white flex p-4 shadow">
        <div className="w-64">
          <img src={game.cover} alt={game.name} className="shadow" />
        </div>
        <div className="flex-auto pl-4">
          <div className="mb-4">
            <Heading align="left">{game.name}</Heading>
          </div>
          <div className="mb-4">
            <p className="italic">{game.description}</p>
          </div>
          <div className="mb-4">
            <p>{game.createdAt.toLocaleString()}</p>
          </div>
          <p>{game.questions.length} questions</p>
          {isAdmin && game.status !== 'finished' && (
            <div className="mt-4">
              <button
                type="submit"
                className="border bg-blue-200 border-blue-500 px-4 py-2 disabled:opacity-50 focus:outline-none focus:shadow-outline"
                onClick={nextState}
              >
                {game.status === 'created'
                  ? 'Activate this challenge'
                  : game.status === 'playing'
                  ? 'Finish this challenge'
                  : ''}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        {game.status === 'created' && !isAdmin && <Created></Created>}
        {game.status === 'playing' && (
          <>
            <PlayingStatus gameId={gameId || ''} />
            <Playing gameId={gameId || ''}></Playing>
          </>
        )}
        {game.status === 'finished' && (
          <Finished gameId={gameId || ''} isAdmin={isAdmin}></Finished>
        )}
      </div>
    </>
  )
}

export default GameId

function Created() {
  return (
    <>
      <p className="italic text-center">
        This game is not ready to play yet...
      </p>
    </>
  )
}

type PlayingStatusProps = {
  gameId: string
}

function PlayingStatus({ gameId }: PlayingStatusProps) {
  const { data: players } = useCollection<Player>(
    gameId ? `challenges/${gameId}/players` : null,
    {
      listen: true,
    },
  )

  const playersAmount = players?.length
  const currentlyPlaying = players?.filter((p) => p.status === 'playing').length
  const finished = players?.filter((p) => p.status === 'finished').length

  return (
    <ul>
      <li>People: {playersAmount}</li>
      <li>Currently playing: {currentlyPlaying}</li>
      <li>Finished: {finished}</li>
    </ul>
  )
}

type PlayingProps = {
  gameId: string
}

function Playing({ gameId }: PlayingProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { data: players } = useCollection<Player>(
    user ? `challenges/${gameId}/players` : null,
    {
      where: ['email', '==', user?.email],
      listen: true,
    },
  )

  if (!user) {
    return (
      /* TODO: add login action */
      <p className="italic text-center">You have to log in before playing.</p>
    )
  }

  const play = async () => {
    if (!user.displayName || !user.email) {
      return alert('You need a display name and email')
    }

    const newPlayer = fuego.db
      .collection('challenges')
      .doc(gameId)
      .collection('players')
      .doc()

    await newPlayer.set({
      name: user.displayName,
      email: user.email,
      score: 0,
      status: 'created',
    })

    router.push(`/games/${gameId}/${newPlayer.id}`)
  }

  const currentPlayer = players?.[0]

  return (
    <>
      <div className="mt-4 text-center">
        {currentPlayer ? (
          <div className="flex">
            <div className="flex-auto">
              {currentPlayer.status !== 'finished' ? (
                <Button
                  onClick={() => {
                    router.push(`/games/${gameId}/${currentPlayer.id}`)
                  }}
                >
                  Go to the game
                </Button>
              ) : (
                /* TODO: make a component */
                <p className="flex flex-col items-center justify-center">
                  <span>You finished</span>
                  <span className="text-6xl font-bold mx-4">
                    {currentPlayer.score.toLocaleString()}
                  </span>
                  <span>with points</span>
                </p>
              )}
            </div>
          </div>
        ) : (
          <Button onClick={play}>Go to the game</Button>
        )}
      </div>
    </>
  )
}

type FinishedProps = {
  isAdmin: boolean
  gameId: string
}

function Finished({ gameId, isAdmin }: FinishedProps) {
  const [isVisible, setVisibility] = useState(false)

  const seePodium = () => {
    setVisibility(true)
  }

  return (
    <>
      <Heading>Stats</Heading>
      {!isVisible && (
        <div className="mt-4 text-center">
          <Button onClick={seePodium}>See podium</Button>
        </div>
      )}
      {isVisible && <Table gameId={gameId} isAdmin={isAdmin} />}
    </>
  )
}

type TableProps = {
  isAdmin: boolean
  gameId: string
}

function Table({ gameId, isAdmin }: TableProps) {
  const { data: players, error, loading } = useCollection<Player>(
    `challenges/${gameId}/players`,
    {
      orderBy: ['score', 'desc'],
    },
  )

  if (loading) {
    return <p className="italic text-center">Loading...</p>
  }

  if (error) {
    return <p className="italic text-center">There was an error.</p>
  }

  if (!players || !players.length) {
    return <p className="italic text-center">There is no players.</p>
  }

  const exportCSV = (players: Player[]) => {
    const csv = players.map((p) => `${p.name},${p.email},${p.score}`).join('\n')
    const csvContent = encodeURI(csv)

    const elem = window.document.createElement('a')
    elem.href = 'data:text/csv;charset=utf-8,' + csvContent
    elem.download = 'podium.csv'

    document.body.appendChild(elem)

    elem.click()

    document.body.removeChild(elem)
  }

  return (
    <>
      {isAdmin && (
        <div className="mb-4">
          <Button
            onClick={() => {
              exportCSV(players)
            }}
          >
            Export .csv
          </Button>
        </div>
      )}
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-white text-left">
            <th className="border w-1/3 px-4 py-2">Position</th>
            <th className="border w-1/3 px-4 py-2">Name</th>
            <th className="border w-1/3 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => (
            <tr key={player.id} className={i < 3 ? 'bg-green-200' : ''}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{player.name}</td>
              <td className="border px-4 py-2">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
