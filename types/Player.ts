export type Player = {
  name: string
  email: string
  score: number
  status: 'created' | 'playing' | 'finished'
  userId: string
}
