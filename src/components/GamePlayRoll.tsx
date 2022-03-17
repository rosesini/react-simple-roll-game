import { useState } from 'react'
import styled from '@emotion/styled'
import { Powerup } from '../domain'

const ROLL_RANGE = 10

type Props = {
  powerup: Powerup | null,
  onRoll: (roll: number) => void
}

const GamePlayRoll: React.FC<Props> = ({ powerup, onRoll }) => {
  const [isBtn, setIsBtn] = useState(true)
  const [roll, setRoll] = useState(0)

  const onBtnClicked = () => {
    let pt = Math.floor(Math.random() * ROLL_RANGE)

    if (powerup) {
      if (powerup === Powerup.Odd) {
        while (!(pt % 2)) {
          pt = Math.floor(Math.random() * ROLL_RANGE)
        }
      } else {
        while ((pt % 2)) {
          pt = Math.floor(Math.random() * ROLL_RANGE)
        }
      }
    }

    setRoll(pt)
    onRoll(pt)
    promptRoll()
  }

  const promptRoll = () => {
    setIsBtn(false)
    setTimeout(() => {
      setIsBtn(true)
    }, 2000)
  }

  return (
    <Container>
      {isBtn ?
        <RollBtn onClick={onBtnClicked}>Roll</RollBtn> :
        <Roll>{roll}</Roll>
      }
    </Container>
  )
}

export default GamePlayRoll

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const RollBtn = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  color: white;
  background-color: seagreen;
  text-align: center;
  font-size: 20px;
  line-height: 100px;
  text-transform: uppercase;
`

const Roll = styled.span`
  font-size: 120px;
  line-height: 1.2;
  color: green;
`