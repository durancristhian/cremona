import { useCollection } from '@nandorojo/swr-firestore'
import Link from 'next/link'
import React, { useState } from 'react'
import { useUser } from '../hooks/useAuth'
import { Game } from '../types/Game'
import A from '../ui/A'
import Heading from '../ui/Heading'
import { toLocalString } from '../utils/toLocalString'

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
      <div className="flex justify-between items-center my-4">
        <div className="flex">
          <select
            name="filter"
            id="filter"
            className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline bg-white"
            onChange={(event) => {
              setStatusFilter(event.target.value)
            }}
            onBlur={() => void 0}
          >
            {FILTERS.map(({ text, value }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
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
                  {toLocalString(game.createdAt)}
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
