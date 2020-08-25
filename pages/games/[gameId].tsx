import { useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { Game } from '../../types/Game'
import Heading from '../../ui/Heading'

const GameId = () => {
  const router = useRouter()
  const gameId = router.query.gameId
  const { data, error, loading } = useDocument<Game>(
    gameId ? `challenges/${gameId}` : null,
    {
      listen: true,
    },
  )

  if (loading) {
    return <p className="italic text-center">Loading...</p>
  }

  if (error) {
    return <p className="italic text-center">There was an error.</p>
  }

  if (!data || !data.id) {
    return <p className="italic text-center">There is no challenge.</p>
  }

  return (
    <>
      <Heading>{data.name}</Heading>
    </>
  )
}

export default GameId
