import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { isArray } from 'util'
import { useAuth } from '../../hooks/useAuth'
import { Game } from '../../types/Game'
import Button from '../../ui/Button'
import Heading from '../../ui/Heading'

const GameId = () => {
  const router = useRouter()
  const gameId = isArray(router.query.gameId)
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
        <div className="w-32">
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
        </div>
      </div>
      {isAdmin && game.status !== 'finished' && (
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="border bg-blue-200 border-blue-500 px-4 py-2 disabled:opacity-50 focus:outline-none focus:shadow-outline"
            onClick={nextState}
          >
            {game.status === 'created'
              ? 'Play'
              : game.status === 'playing'
              ? 'Finish'
              : ''}
          </button>
        </div>
      )}
      <div className="mt-4">
        {game.status === 'created' && <Created></Created>}
        {game.status === 'playing' && <Playing gameId={gameId || ''}></Playing>}
        {game.status === 'finished' && (
          <Finished gameId={gameId || ''}></Finished>
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

type PlayingProps = {
  gameId: string
}

type Player = {
  name: string
  email: string
  score: number
}

function Playing({ gameId }: PlayingProps) {
  const { add } = useCollection<Player>(`challenges/${gameId}/players`)
  const { user } = useAuth()

  if (!user) {
    return (
      <p className="italic text-center">You have to log in before playing.</p>
    )
  }

  const play = () => {
    if (!user.displayName || !user.email) {
      return alert('You need a display name and email')
    }

    add({
      name: user.displayName,
      email: user.email,
      score: Math.round(Math.random() * 100),
    })
  }

  return (
    <>
      <Heading>Playing</Heading>
      <div className="mt-4 text-center">
        <Button type="submit" onClick={play}>
          Ready to play
        </Button>
      </div>
    </>
  )
}

type FinishedProps = {
  gameId: string
}

function Finished({ gameId }: FinishedProps) {
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
      {isVisible && <Table gameId={gameId} />}
    </>
  )
}

type TableProps = {
  gameId: string
}

function Table({ gameId }: TableProps) {
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

  return (
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
          <tr key={player.id}>
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2">{player.name}</td>
            <td className="border px-4 py-2">{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
