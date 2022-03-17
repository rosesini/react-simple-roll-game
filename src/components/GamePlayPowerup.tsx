import { Powerup } from '../domain'
import styled from '@emotion/styled'

type Props = {
  powerup: Powerup | null,
  onPowerupSelect: (powerup: Powerup) => void,
  disabled: boolean
}

const GamePlayPowerup: React.FC<Props> = ({ powerup, onPowerupSelect, disabled }) => {
  const onOddSelect = () => {
    onPowerupSelect(Powerup.Odd)
  }

  const onEvenSelect = () => {
    onPowerupSelect(Powerup.Even)
  }

  return (
    <div>
      <p>
        <button onClick={onOddSelect} disabled={disabled || !!powerup}>⚡ Odd</button>
        <button onClick={onEvenSelect} disabled={disabled || !!powerup}>⚡ Even</button>
      </p>

      {powerup && (
        <PowerupLabel>
          💪 Power Up: {powerup === Powerup.Odd ? 'Odd' : 'Even'} !!
        </PowerupLabel>
      )}
    </div>
  )
}

export default GamePlayPowerup

const PowerupLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
`