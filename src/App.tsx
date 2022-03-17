import React, { useEffect, useState } from 'react'
import { User } from './domain'
import GameScene from './GameScene'
import Login from './Login'
import * as store from './store'

function Main() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const subscription = store.getUserVar().asObservable().subscribe(value => {
      setUser(value)
    })

    return function cleanup() {
      subscription.unsubscribe()
    }
  })

  return user ? <GameScene /> : <Login />
}

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App