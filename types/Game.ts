export type Option = {
  id: string
  content: string
}

export type Question = {
  id: string
  description: string
  time: number
  validOption: string
  options: Option[]
}

export type Game = {
  id: string
  name: string
  description: string
  cover: string
  createdAt: Date
  createdBy: string
  status: 'created' | 'playing' | 'finished'
  questions: Question[]
}
