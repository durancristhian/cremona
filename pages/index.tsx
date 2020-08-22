import React from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Index() {
  const { user } = useAuth()

  return <div className="p-4">{user ? 'Hello' : null}</div>
}
