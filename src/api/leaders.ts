import * as store from '../store'

const leadersApi = {
  getLeaders: (count: number = 5) => store.getLeaders(count)
}

export default leadersApi