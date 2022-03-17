export type User = {
  name: string
}

export enum Powerup {
  Odd = 'odd',
  Even = 'even'
}

export type GameStatus = {
  isWon: boolean,
  rolls: number
}