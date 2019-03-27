import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return <h1>{props.coursetitle}</h1>;
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = props => {
  return <p>yhteensä {props.total.reduce((acc, obj) => acc + obj.exercises, 0)} tehtävää</p>;
};

const Content = props => {
  return (
    <>
      {props.parts.map(subitem => (
        <Part key={subitem.id} name={subitem.name} exercises={subitem.exercises} />
      ))}
    </>
  );
};

const Course = ({ courses }) => {
  const listItems = courses.map(item => (
    <div key={item.id}>
      <Header coursetitle={item.name} />
      <Content parts={item.parts} />
      <Total total={item.parts} />
    </div>
  ));

  return <div>{listItems}</div>;
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <Course courses={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
