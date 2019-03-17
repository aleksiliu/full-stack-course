import React from 'react'
import ReactDOM from 'react-dom'


const Header = props => {
  return (
    <h1>{props.title}</h1>
  )
}

const Content = props => {
  return (
    <p>
      {props.part} {props.exerciseCount}
    </p>
  )
}

const Total = props => {
  return (
    <p>yhteensä {props.exercisesTotal} tehtävää</p>
  )
}


const App = () => {
  const courseTitle = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header title={courseTitle} />
      <Content part={part1} exerciseCount={exercises1} /> 
      <Content part={part2} exerciseCount={exercises2} /> 
      <Content part={part3} exerciseCount={exercises3} /> 
      <Total exercisesTotal={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))