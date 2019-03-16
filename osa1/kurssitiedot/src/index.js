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
      {props.part} {props.exercisesTotal}
    </p>
  )
}


const App = () => {
  const courseTitle = 'Half Stack -sovelluskehsaddays'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header title={courseTitle} />
      <Content part={part1} exercisesTotal={exercises1} /> 
      <Content part={part2} exercisesTotal={exercises3} /> 
      <Content part={part3} exercisesTotal={exercises3} /> 
      <p>yhteensä {exercises1 + exercises2 + exercises3} tehtävää</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))