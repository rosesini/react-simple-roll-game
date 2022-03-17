import userApi from './api/user'
import LoginForm from './components/LoginForm'
import { User } from './domain'

export default function Login() {
  const login = (user: User) => {
    userApi.login(user)
  }

  return (
    <LoginForm submit={login} />
  )
}