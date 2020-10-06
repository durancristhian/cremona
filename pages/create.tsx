import React from 'react'
import CreateChallenge from '../components/CreateChallenge'
import { useAuth } from '../hooks/useAuth'

function Create() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return <CreateChallenge />
}

export default Create
