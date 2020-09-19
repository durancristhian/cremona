import { useCollection } from '@nandorojo/swr-firestore'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { useUser } from '../hooks/useAuth'
import { Game, Question } from '../types/Game'
import Button from '../ui/Button'
import Heading from '../ui/Heading'

type InitialValue = {
  name: string
  description: string
  questions: Question[]
}

const initialValues: InitialValue = {
  name: '',
  description: '',
  questions: [],
}

const CreateChallenge = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const user = useUser()
  const { add } = useCollection<Game>('challenges')

  const onSubmit = async (values: InitialValue) => {
    setMessage('Processing...')

    return new Promise(async (resolve, reject) => {
      try {
        await add({
          name: values.name,
          cover: 'https://source.unsplash.com/random/200x200',
          createdAt: new Date(),
          description: values.description,
          id: '',
          status: 'created',
          createdBy: user.uid,
          questions: values.questions,
        })

        setMessage('Challenge created. Redirecting home...')

        resolve()

        router.push('/')
      } catch (error) {
        console.error(error)

        setMessage(error.message)

        reject()
      }
    })
  }

  return (
    <>
      <div className="mb-4">
        <Heading type="h2">Create a challenge</Heading>
      </div>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(140, 'Must be 140 characters or less')
            .required('Required'),
          description: Yup.string()
            .max(280, 'Must be 280 characters or less')
            .required('Required'),
          questions: Yup.array().min(1),
          /* .of(
              Yup.object({
                id: Yup.string().required('Required'),
                description: Yup.string()
                  .max(280, 'Must be 280 characters or less')
                  .required('Required'),
                time: Yup.mixed().oneOf(['30', '60', '120']),
                validOption: Yup.string().required('Required'),
                options: Yup.array()
                  .min(4)
                  .max(4)
                  .of(
                    Yup.object({
                      id: Yup.string().required('Required'),
                      content: Yup.string()
                        .max(280, 'Must be 280 characters or less')
                        .required('Required'),
                    }),
                  ),
              }),
            ), */
        })}
        onSubmit={onSubmit}
      >
        {({ dirty, isValidating, isValid, isSubmitting, values }) => (
          <Form>
            <div className="mb-4">
              <Field
                name="name"
                type="text"
                className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                render={(msg) => <div className="text-red-500">{msg}</div>}
              />
            </div>
            <div className="mb-4">
              <Field
                name="description"
                type="text"
                className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                render={(msg) => <div className="text-red-500">{msg}</div>}
              />
            </div>
            <div className="mb-4">
              <FieldArray
                name="questions"
                render={({ push, remove }) => (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Heading type="h2">Questions</Heading>
                      <Button
                        type="button"
                        onClick={() => {
                          const defaultValidOption = uuidv4()

                          push({
                            id: uuidv4(),
                            description: '',
                            time: 30,
                            validOption: defaultValidOption,
                            options: [
                              {
                                id: defaultValidOption,
                                content: 'Option 1',
                              },
                              {
                                id: uuidv4(),
                                content: 'Option 2',
                              },
                              {
                                id: uuidv4(),
                                content: 'Option 3',
                              },
                              {
                                id: uuidv4(),
                                content: 'Option 4',
                              },
                            ],
                          })
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    {values.questions.map((question, questionIndex) => (
                      <div key={question.id} className="mb-4">
                        <div className="mb-4">
                          <Field
                            name={`questions.${questionIndex}.description`}
                            type="text"
                            className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                            placeholder="Description"
                          />
                          <ErrorMessage
                            name={`questions.${questionIndex}.description`}
                            render={(msg) => (
                              <div className="text-red-500">{msg}</div>
                            )}
                          />
                        </div>
                        <div className="mb-4">
                          <Field
                            name={`questions.${questionIndex}.time`}
                            as="select"
                            className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                            placeholder="Description"
                          >
                            <option value="30">30 seconds</option>
                            <option value="60">60 seconds</option>
                            <option value="120">120 seconds</option>
                          </Field>
                          <ErrorMessage
                            name={`questions.${questionIndex}.time`}
                            render={(msg) => (
                              <div className="text-red-500">{msg}</div>
                            )}
                          />
                        </div>
                        {question.options.map((option, optionIndex) => (
                          <div key={option.id} className="mb-4">
                            <Field
                              name={`questions.${questionIndex}.options.${optionIndex}.content`}
                              type="text"
                              className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                              placeholder="Option content"
                            />
                            <ErrorMessage
                              name={`questions.${questionIndex}.options.${optionIndex}.content`}
                              render={(msg) => (
                                <div className="text-red-500">{msg}</div>
                              )}
                            />
                          </div>
                        ))}
                        <ErrorMessage
                          name={`questions.${questionIndex}.options`}
                          render={(msg) => (
                            <div className="text-red-500">{msg}</div>
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            remove(questionIndex)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              />
              <ErrorMessage
                name="questions"
                render={(msg) => <div className="text-red-500">{msg}</div>}
              />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                disabled={!dirty || !isValid || isValidating || isSubmitting}
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {message && (
        <div className="mt-4 text-center">
          <p className="italic">{message}</p>
        </div>
      )}
    </>
  )
}

export default CreateChallenge
