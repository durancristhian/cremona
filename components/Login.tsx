import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type LoginMode = 'signin' | 'signup'

type Props = {
  mode: LoginMode
}

const Login = ({ mode }: Props) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [inProgress, setInProgress] = useState(false)
  const [message, setMessage] = useState('')
  const { signin, signup } = useAuth()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    setInProgress(true)
    setMessage('Processing...')

    const method = mode === 'signin' ? signin : signup

    method(formData.email, formData.password)
      .then(() => {
        setInProgress(false)
        setMessage('')

        router.push('/')
      })
      .catch((error: Error) => {
        console.error(error)

        setInProgress(false)
        setMessage(error.message)
      })
  }

  return (
    <>
      <div className="mb-4">
        <h1>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h1>
      </div>
      <form onSubmit={onSubmit}>
        <fieldset disabled={inProgress}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  email: target.value,
                })
              }}
              placeholder="Email"
              autoComplete="email"
              className="block px-4 py-2 shadow w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  password: target.value,
                })
              }}
              placeholder="Password"
              autoComplete="current-password"
              className="block px-4 py-2 shadow w-full"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="border bg-blue-200 border-blue-500 px-4 py-2 disabled:opacity-50"
              disabled={!formData.email || !formData.password}
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
          {message && (
            <div className="mt-4 text-center">
              <p className="italic">{message}</p>
            </div>
          )}
        </fieldset>
      </form>
    </>
  )
}

export default Login
