import { useCollection } from '@nandorojo/swr-firestore'
import Link from 'next/link'
import React from 'react'
import { useUser } from '../hooks/useAuth'
import { Game } from '../types/Game'
import A from '../ui/A'
import Heading from '../ui/Heading'

const ListChallenges = () => {
  const user = useUser()
  const { data, error, loading } = useCollection<Game>('challenges', {
    listen: true,
    parseDates: ['createdAt'],
    where: ['createdBy', '==', user.uid],
    orderBy: ['createdAt', 'desc'],
  })

  if (loading) {
    return <p className="italic text-center">Loading...</p>
  }

  if (error) {
    return <p className="italic text-center">There was an error.</p>
  }

  if (!data || !data.length) {
    return <p className="italic text-center">There is no challenges.</p>
  }

  return (
    <>
      <div className="mb-4">
        <Heading type="h2" align="left">
          Your challenges
        </Heading>
      </div>
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-white text-left">
            <th className="border w-1/3 px-4 py-2">Name</th>
            <th className="border w-1/3 px-4 py-2">Status</th>
            <th className="border w-1/3 px-4 py-2">Created at</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game) => (
            <tr key={game.id}>
              <td className="border px-4 py-2">
                <Link href="/games/[gameId]" as={`/games/${game.id}`} passHref>
                  <A href="#!">{game.name}</A>
                </Link>
              </td>
              <td className="border px-4 py-2">{game.status}</td>
              <td className="border px-4 py-2">
                {game.createdAt.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListChallenges
