import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return <h1>{props.title}</h1>;
};

const Content = props => {
  return (
    <>
      <Part part={props.parts[0].name} exerciseCount={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exerciseCount={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exerciseCount={props.parts[2].exercises} />
    </>
  );
};

const Part = props => {
  return (
    <p>
      {props.part} {props.exerciseCount}
    </p>
  );
};

const Total = ({ parts }) => {
  return <p>yhteensä tehtävää {parts.reduce((a, b) => a + b.exercises, 0)}</p>;
};

const Course = props => {
  return (
    <div>
      <Header title={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
