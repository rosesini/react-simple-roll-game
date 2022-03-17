import { useState } from 'react'
import styled from '@emotion/styled'
import { GameStatus, Powerup } from './domain'
import GamePlayPowerup from './components/GamePlayPowerup'
import GamePlayRoll from './components/GamePlayRoll'

const GOAL_POINTS = 50
const RETRY_COUNT = 5
const POWERUP_COUNT = 2


type Props = {
  onComplete: (value: GameStatus) => void
}

const GamePlay: React.FC<Props> = ({ onComplete }) => {
  const [points, setPoints] = useState(0)
  const [rolls, setRolls] = useState(0)
  const [powerupCounts, setPowerupCounts] = useState(POWERUP_COUNT)
  const [powerup, setPowerup] = useState<Powerup | null>(null)
  const [retryCount, setRetryCount] = useState(RETRY_COUNT)
  const [isFinished, setIsFinished] = useState(false)

  const onRoll = (roll: number) => {
    const nextPoints = points + roll

    if (powerup) {
      setPowerup(null)
    }

    setRolls(rolls + 1)

    if (nextPoints <= GOAL_POINTS) {
      setPoints(nextPoints)
    } else {
      setRetryCount(retryCount - 1)
    }

    if (nextPoints === GOAL_POINTS || retryCount === 1) {
      setIsFinished(true)

      onComplete({
        isWon: nextPoints === GOAL_POINTS,
        rolls: rolls + 1
      })
    }
  }

  const applyPowerup = (value: Powerup) => {
    setPowerup(value)
    setPowerupCounts(powerupCounts - 1)
  }

  const restart = () => {
    setPoints(0)
    setRolls(0)
    setPowerupCounts(POWERUP_COUNT)
    setPowerup(null)
    setRetryCount(RETRY_COUNT)
    setIsFinished(false)
  }

  return (
    <>
      <MainArea>
        <div>
          <p>Goal Points: <strong>{GOAL_POINTS}</strong></p>
          <p>Points:&nbsp;&nbsp; <strong>{points}</strong></p>
          <p>Rolls:&nbsp;&nbsp;&nbsp; <strong>{rolls}</strong></p>
        </div>

        {isFinished ?
          <FinishScreen>
            <p>You {points === GOAL_POINTS ? 'Won' : 'Lose'}. Play Again?</p>
            <button onClick={() => restart()}>Play</button>
          </FinishScreen> :
          <>
            <GamePlayPowerup
              powerup={powerup}
              onPowerupSelect={applyPowerup}
              disabled={!powerupCounts}
            />
            <GamePlayRoll
              powerup={powerup}
              onRoll={onRoll}
            />
          </>
        }
      </MainArea>

      <p>
        <button onClick={() => restart()}>Restart</button>
      </p>
    </>
  )
}

export default GamePlay

const MainArea = styled.div`
  width: 450px;
  height: 450px;
  padding: 20px;
  border: solid 2px mediumpurple;
  font-size: 18px;
  display: flex;
  flex-direction: column;

  p {
    margin-block-start: 4px;
    margin-block-end: 4px;
  }
`

const FinishScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`