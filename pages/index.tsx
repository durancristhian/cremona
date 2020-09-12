import React from 'react'
import CreateChallenge from '../components/CreateChallenge'
import ListChallenges from '../components/ListChallenges'
import { useAuth, useUser } from '../hooks/useAuth'
import Button from '../ui/Button'
import Heading from '../ui/Heading'

export default function Index() {
  const { user } = useAuth()

  return <div className="p-4">{user ? <LoggedIn /> : <LoggedOut />}</div>
}

function LoggedIn() {
  const user = useUser()

  return (
    <>
      <p className="text-center">Welcome, {user.displayName}</p>
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
  const { googleSignIn } = useAuth()

  return (
    <div className="text-center">
      <p className="italic mb-4">You need to sign in.</p>
      <Button
        onClick={() => {
          googleSignIn()
        }}
      >
        Sign in with Google
      </Button>
    </div>
  )
}
