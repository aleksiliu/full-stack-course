import React from 'react'
import ReactDOM from 'react-dom'


const Header = props => {
  return (
    <h1>{props.title}</h1>
  )
}

const Content = props => {
  return (
    <>
      <Part part={props.part1} exerciseCount={props.exercises1} />
      <Part part={props.part2} exerciseCount={props.exercises2} />
      <Part part={props.part3} exerciseCount={props.exercises3} />
    </>
  )
}

const Part = props => {
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
  const props = {
    part1: 'Reactin perusteet',
    part2: 'Tiedonvälitys propseilla',
    part3: 'Komponenttien tila',
    exercises1: 10,
    exercises2: 7,
    exercises3: 14
  }


  return (
    <div>
      <Header title={courseTitle} />
      <Content {...props} /> 
      <Total exercisesTotal={props.exercises1 + props.exercises2 + props.exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))