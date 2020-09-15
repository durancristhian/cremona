import React from 'react'
import CreateChallenge from '../components/CreateChallenge'
import { useAuth } from '../hooks/useAuth'

function Create() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="p-4">
      <CreateChallenge />
    </div>
  )
}

export default Create
