import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import leadersApi from './api/leaders'
import userApi from './api/user'
import LeaderBoard from './components/LeaderBoard'
import { GameStatus } from './domain'
import GamePlay from './GamePlay'

const CONGRATS_TIMEOUT = 10

const Congrats = () => (
  <p>🎉 Congratulations!!! You've hit the high score.</p>
)

const GameScene = () => {
  const user = userApi.loggedInUser()

  const [leaders, setLeaders] = useState<number[]>([])
  const [isCongrats, setIsCongrats] = useState(false)

  const handlePlayResult = (status: GameStatus) => {
    const { isWon, rolls } = status

    if (isWon) {
      const { isHighScore } = userApi.addScore(rolls)

      fetchLeaders()
      isHighScore && promptCongrats()
    }
  }

  const fetchLeaders = () => {
    setLeaders(leadersApi.getLeaders())
  }

  const promptCongrats = () => {
    setIsCongrats(true)

    setTimeout(() => {
      setIsCongrats(false)
    }, CONGRATS_TIMEOUT * 1000)
  }

  useEffect(() => {
    fetchLeaders()
  }, [])

  return (
    <Row>
      <Column>
        <p>Player: {user?.name}</p>
        <GamePlay onComplete={handlePlayResult} />

        {isCongrats && <Congrats />}
      </Column>
      <Column>
        <LeaderBoard leaders={leaders} />
      </Column>
    </Row>
  )
}

export default GameScene

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Column = styled.div`
  padding: 0 10px;
`