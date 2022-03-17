import { User } from '../domain'

function getUser(): User | null {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

function setUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
}

function getScores(): number[] {
  const scores = localStorage.getItem('scores')
  return scores ? JSON.parse(scores) : []
}

function setScores(scores: number[]) {
  localStorage.setItem('scores', JSON.stringify(scores))
}

const localStorageApi = {
  getUser,
  setUser,
  getScores,
  setScores
}

export default localStorageApi