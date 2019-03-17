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
      <Part part={props.parts[0].name} exerciseCount={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exerciseCount={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exerciseCount={props.parts[2].exercises} />
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
    <p>yhteensä {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises} tehtävää</p>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header title={course} />
      <Content parts={parts}/> 
      <Total exercises={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))