import React from 'react'
import CreateChallenge from '../components/CreateChallenge'
import ListChallenges from '../components/ListChallenges'
import { useAuth, useUser } from '../hooks/useAuth'
import Heading from '../ui/Heading'

export default function Index() {
  const { user } = useAuth()

  return <div className="p-4">{user ? <LoggedIn /> : <LoggedOut />}</div>
}

function LoggedIn() {
  const user = useUser()

  return (
    <>
      <Heading type="h2">Welcome, {user.email}</Heading>
      <div className="my-4">
        <CreateChallenge />
      </div>
      <div className="my-4">
        <ListChallenges />
      </div>
    </>
  )
}

function LoggedOut() {
  return <p className="italic text-center">You need to sign in.</p>
}
