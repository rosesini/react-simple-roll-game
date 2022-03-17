import { BehaviorSubject } from 'rxjs'
import localStorageApi from './api/localStorage'
import { User } from './domain'

let userVar: BehaviorSubject<User | null>
let userScores: number[]

export function init() {
  userVar = new BehaviorSubject<User | null>(localStorageApi.getUser())
  userScores = localStorageApi.getScores() || []
}

export const getUserVar = () => userVar

export const getUser = () => userVar.getValue()

export const setUser = (user: User) => {
  userVar.next(user)
  localStorageApi.setUser(user)
}

export const addScore = (score: number) => {
  const isHighScore = !userScores.length || score < userLowScore()

  userScores.push(score)
  localStorageApi.setScores(userScores)

  return {
    success: true,
    isHighScore
  }
}

export const getLeaders = (count: number): number[] => {
  return userScores.sort((a, b) => a - b).slice(0, count)
}

const userLowScore = () => {
  return Math.min(...userScores)
}