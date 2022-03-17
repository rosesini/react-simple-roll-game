import { User } from '../domain'
import * as store from '../store'

const userApi = {
  loggedInUser: () => store.getUser(),
  login: (user: User) => store.setUser(user),
  addScore: (score: number) => store.addScore(score)
}

export default userApi