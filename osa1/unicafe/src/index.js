import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => <button onClick={props.onClick}>{props.label}</button>

const StatisticsLine = props => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = props => {
  const all = props.good + props.neutral + props.bad

  if (all === 0) return <p>No feedback given</p>

  const sum = props.good - props.bad
  const average = sum / all
  const positive = props.good / all
  const positivePercentage = `${positive * 100} %`

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text={'good'} value={props.good} />
          <StatisticsLine text={'neutral'} value={props.neutral} />
          <StatisticsLine text={'bad'} value={props.bad} />
          <StatisticsLine text={'all'} value={all} />
          <StatisticsLine text={'average'} value={average} />
          <StatisticsLine text={'positive'} value={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} label={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} label={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} label={'bad'} />


      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)