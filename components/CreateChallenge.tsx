import { useCollection } from '@nandorojo/swr-firestore'
import React, { FormEvent, useState } from 'react'
import { useUser } from '../hooks/useAuth'
import Heading from '../ui/Heading'
import { Game } from '../types/Game'

const CreateChallenge = () => {
  const [inProgress, setInProgress] = useState(false)
  const [message, setMessage] = useState('')
  const user = useUser()
  const { add } = useCollection<Game>('challenges')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setInProgress(true)
    setMessage('Processing...')

    try {
      await add({
        name: 'Challenge',
        cover: 'https://source.unsplash.com/random/200x200',
        createdAt: new Date(),
        description: 'Welcome to the challenge',
        id: '',
        status: 'created',
        createdBy: user.uid,
        questions: [
          {
            id: 'question-1',
            description:
              '¿Qué es lo más rico que puedo comprar en la panadería?',
            time: 30,
            validOption: 'option-1',
            options: [
              {
                id: 'option-1',
                content: 'Cremona',
              },
              {
                id: 'option-2',
                content: 'Cañoncito de dulce de leche',
              },
              {
                id: 'option-3',
                content: 'Pepas',
              },
              {
                id: 'option-4',
                content: 'Sanguchitos de miga',
              },
            ],
          },
          {
            id: 'question-2',
            description: 'Pregunta 2',
            time: 30,
            validOption: 'option-2',
            options: [
              {
                id: 'option-1',
                content: 'Cremona',
              },
              {
                id: 'option-2',
                content: 'Cañoncito de dulce de leche',
              },
              {
                id: 'option-3',
                content: 'Pepas',
              },
              {
                id: 'option-4',
                content: 'Sanguchitos de miga',
              },
            ],
          },
          {
            id: 'question-3',
            description: 'Pregunta 3',
            time: 30,
            validOption: 'option-3',
            options: [
              {
                id: 'option-1',
                content: 'Cremona',
              },
              {
                id: 'option-2',
                content: 'Cañoncito de dulce de leche',
              },
              {
                id: 'option-3',
                content: 'Pepas',
              },
              {
                id: 'option-4',
                content: 'Sanguchitos de miga',
              },
            ],
          },
        ],
      })

      setInProgress(false)
      setMessage('')
    } catch (error) {
      console.error(error)

      setInProgress(false)
      setMessage(error.message)
    }
  }

  return (
    <>
      <div className="mb-4">
        <Heading type="h2" align="center">
          Create a challenge
        </Heading>
      </div>
      <form onSubmit={onSubmit}>
        <fieldset disabled={inProgress}>
          <div className="text-center">
            <button
              type="submit"
              className="border bg-blue-200 border-blue-500 px-4 py-2 disabled:opacity-50 focus:outline-none focus:shadow-outline"
            >
              Create
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

export default CreateChallenge
