import React from 'react'
import { Login } from '.'
import CreateChallenge from '../components/CreateChallenge'
import { useAuth } from '../hooks/useAuth'

function Create() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return <CreateChallenge />
}

export default Create
