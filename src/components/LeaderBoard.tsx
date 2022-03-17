type Props = {
  leaders: number[]
}

const LeaderBoard: React.FC<Props> = ({ leaders }) => {
  if (!leaders.length) {
    return <p>No Leaders</p>
  }

  return (
    <div>
      <p>Leader Board</p>

      <ol>
        {leaders.map((leader, index) => (
          <li key={index}>{leader}</li>
        ))}
      </ol>
    </div>
  )
}

export default LeaderBoard