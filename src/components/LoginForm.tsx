import React, { useState } from 'react'
import { User } from '../domain'

type Props = {
  submit: (user: User) => void
}

const LoginForm: React.FC<Props> = ({ submit }) => {
  const [userName, setUserName] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    submit({
      name: userName
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        required
        placeholder="Your Name"
        onChange={e => setUserName(e.target.value)}
      />
      <button type="submit">Next</button>
    </form>
  )
}

export default LoginForm