import { useCollection } from '@nandorojo/swr-firestore'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '../hooks/useAuth'
import CheckCircle from '../icons/CheckCircle'
import { Game } from '../types/Game'
import A from '../ui/A'
import Button from '../ui/Button'
import Heading from '../ui/Heading'

const FILTERS = [
  {
    text: 'Created',
    value: 'created',
  },
  {
    text: 'Playing',
    value: 'playing',
  },
  {
    text: 'Finished',
    value: 'finished',
  },
]

const ListChallenges = () => {
  const user = useUser()
  const [statusFilter, setStatusFilter] = useState('created')
  const { data, error, loading } = useCollection<Game>('challenges', {
    listen: true,
    parseDates: ['createdAt'],
    where: [
      ['createdBy', '==', user.uid],
      ['status', '==', statusFilter],
    ],
    orderBy: ['createdAt', 'desc'],
  })

  return (
    <>
      <Heading type="h2" align="center">
        Your challenges
      </Heading>
      <div className="flex items-center my-4">
        <div className="flex flex-auto">
          {FILTERS.map(({ text, value }) => (
            <div key={value} className="mr-4">
              <Button
                onClick={() => {
                  setStatusFilter(value)
                }}
              >
                {statusFilter === value && <CheckCircle className="h-6 mr-4" />}
                {text}
              </Button>
            </div>
          ))}
        </div>
        <div>
          <Link href="/create" passHref>
            <A href="#!">Create</A>
          </Link>
        </div>
      </div>
      {loading && <p className="italic text-center">Loading...</p>}
      {error && <p className="italic text-center">There was an error.</p>}
      {!data ||
        (!data.length && (
          <p className="italic text-center">There is no challenges.</p>
        ))}
      {data && !!data.length && (
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
                  <Link
                    href="/games/[gameId]"
                    as={`/games/${game.id}`}
                    passHref
                  >
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
      )}
    </>
  )
}

export default ListChallenges
