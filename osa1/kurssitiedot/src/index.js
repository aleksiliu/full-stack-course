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
      <Part part={props.part1.name} exerciseCount={props.part1.exercises} />
      <Part part={props.part2.name} exerciseCount={props.part2.exercises} />
      <Part part={props.part3.name} exerciseCount={props.part3.exercises} />
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
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }
  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }
  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }


  return (
    <div>
      <Header title={courseTitle} />
      <Content part1={part1} part2={part2} part3={part3}/> 
      <Total exercisesTotal={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))