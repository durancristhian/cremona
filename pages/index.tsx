import React from 'react'
import ListChallenges from '../components/ListChallenges'
import { useAuth } from '../hooks/useAuth'
import Button from '../ui/Button'

export default function Index() {
  const { user } = useAuth()

  return user ? <ListChallenges /> : <Login />
}

export function Login() {
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
