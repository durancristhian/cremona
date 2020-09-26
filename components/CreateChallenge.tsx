import { useCollection } from '@nandorojo/swr-firestore'
import firebase from 'firebase'
import { Field, FieldArray, Form, Formik, FormikValues, getIn } from 'formik'
import { useRouter } from 'next/router'
import React, { FormEvent, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { useUser } from '../hooks/useAuth'
import CheckCircle from '../icons/CheckCircle'
import Minus from '../icons/Minus'
import Photograph from '../icons/Photograph'
import XCircle from '../icons/XCircle'
import { Game, Question } from '../types/Game'
import Button from '../ui/Button'
import Heading from '../ui/Heading'

type InitialValue = {
  cover: string
  coverName: string
  name: string
  description: string
  questions: Question[]
}

const ErrorMessage = ({ name }: { name: string }) => (
  <Field name={name}>
    {({ form }: { form: FormikValues }) => {
      const error = getIn(form.errors, name)
      const touch = getIn(form.touched, name)

      return touch && error ? (
        <div className="text-red-500 mt-1">{error}</div>
      ) : null
    }}
  </Field>
)

const initialValues: InitialValue = {
  cover: '',
  coverName: '',
  name: '',
  description: '',
  questions: [],
}

const CreateChallenge = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const user = useUser()
  const { add } = useCollection<Game>('challenges')
  const coverRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (values: InitialValue) => {
    setMessage('Processing...')

    return new Promise(async (resolve, reject) => {
      try {
        const storageRef = firebase.storage().ref()
        const coverName = `${uuidv4()}${values.coverName}`
        const coverRef = storageRef.child(coverName)

        await coverRef.putString(values.cover, 'data_url')

        const cover = await coverRef.getDownloadURL()

        await add({
          name: values.name,
          cover,
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
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required('Required')
            .max(140, 'Must be 140 characters or less'),
          description: Yup.string()
            .required('Required')
            .max(280, 'Must be 280 characters or less'),
          cover: Yup.string(),
          coverExtension: Yup.mixed().oneOf(['jpg', 'jpeg', 'png']),
          questions: Yup.array()
            .min(1)
            .of(
              Yup.object().shape({
                id: Yup.string().required('Required'),
                description: Yup.string()
                  .required('Required')
                  .max(280, 'Must be 280 characters or less'),
                time: Yup.mixed().oneOf(['30', '60', '120']),
                validOption: Yup.string().required('Required'),
                options: Yup.array().of(
                  Yup.object().shape({
                    id: Yup.string().required('Required'),
                    content: Yup.string()
                      .required('Required')
                      .max(280, 'Must be 280 characters or less'),
                  }),
                ),
              }),
            ),
        })}
        onSubmit={onSubmit}
      >
        {({
          dirty,
          isValidating,
          isValid,
          isSubmitting,
          values,
          setFieldValue,
        }) => (
          <Form>
            <div className="mb-4">
              <Field
                name="name"
                type="text"
                className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                placeholder="Name"
              />
              <ErrorMessage name="name" />
            </div>
            <div className="mb-4">
              <Field
                name="description"
                type="text"
                className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                placeholder="Description"
              />
              <ErrorMessage name="description" />
            </div>
            <div className="mb-4">
              <input
                ref={coverRef}
                type="file"
                name="cover"
                className="visually-hidden"
                id="cover"
                multiple={false}
                accept="image/x-png,image/jpeg,image/jpg"
                tabIndex={-1}
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  const file =
                    event.currentTarget.files &&
                    event.currentTarget.files.length
                      ? event.currentTarget.files[0]
                      : null

                  if (file) {
                    const reader = new FileReader()

                    reader.readAsDataURL(file)

                    reader.onload = function () {
                      setFieldValue('coverName', file.name)
                      setFieldValue('cover', reader.result)
                    }
                  } else {
                    setFieldValue('coverName', '')
                    setFieldValue('cover', '')

                    if (coverRef.current) {
                      coverRef.current.value = ''
                    }
                  }
                }}
              />
              {!values.cover ? (
                <button
                  type="button"
                  className="h-64 w-full border-black border-2 border-dashed focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    if (coverRef.current) {
                      coverRef.current.click()
                    }
                  }}
                >
                  <div className="flex flex-col justify-center items-center px-4 py-2">
                    <Photograph className="h-6 mb-2" />
                    <span>Add cover</span>
                  </div>
                </button>
              ) : (
                <div className="flex justify-center mx-auto">
                  <div className="relative">
                    <img
                      src={values.cover}
                      alt={values.coverName}
                      className="mx-auto shadow h-64"
                    />
                    <button
                      className="absolute bg-white border-2 rounded-full top-0 right-0 p-2 -mt-2 -mr-2 focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        setFieldValue('coverName', '')
                        setFieldValue('cover', '')

                        if (coverRef.current) {
                          coverRef.current.value = ''
                        }
                      }}
                    >
                      <Minus className="h-2" />
                    </button>
                  </div>
                </div>
              )}
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
                            time: '30',
                            validOption: defaultValidOption,
                            options: [
                              {
                                id: defaultValidOption,
                                content: '',
                              },
                              {
                                id: uuidv4(),
                                content: '',
                              },
                              {
                                id: uuidv4(),
                                content: '',
                              },
                              {
                                id: uuidv4(),
                                content: '',
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
                            name={`questions[${questionIndex}].description`}
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
                        </div>
                        {question.options.map((option, optionIndex) => (
                          <div key={option.id} className="mb-4">
                            <div className="flex items-center">
                              <div className="flex-auto">
                                <Field
                                  name={`questions.${questionIndex}.options.${optionIndex}.content`}
                                  type="text"
                                  className="border-2 px-4 py-2 focus:outline-none focus:shadow-outline w-full mb-1"
                                  placeholder={`Option content #${
                                    optionIndex + 1
                                  }`}
                                />
                              </div>
                              <div className="ml-4">
                                <button
                                  type="button"
                                  className="focus:outline-none focus:shadow-outline"
                                  onClick={() => {
                                    setFieldValue(
                                      `questions.${questionIndex}.validOption`,
                                      option.id,
                                    )
                                  }}
                                >
                                  {question.validOption === option.id ? (
                                    <CheckCircle className="h-6 text-green-500" />
                                  ) : (
                                    <XCircle className="h-6 text-red-500" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <ErrorMessage
                              name={`questions[${questionIndex}].options[${optionIndex}].content`}
                            />
                          </div>
                        ))}
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
