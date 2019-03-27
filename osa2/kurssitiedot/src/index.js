import React from 'react';
import ReactDOM from 'react-dom';

const Content = props => {
  const listItems = props.courses.map(item => (
    <div key={item.id}>
      <h1>{item.name}</h1>
      {item.parts.map(subitem => {
        return (
          <p key={subitem.id}>
            {subitem.name} {subitem.exercises}
          </p>
        );
      })}
      <p>yhteensä {item.parts.reduce((acc, obj) => acc + obj.exercises, 0)} tehtävää </p>
    </div>
  ));

  return <div>{listItems}</div>;
};

const Course = ({ courses }) => {
  return (
    <div>
      <Content courses={courses} />
    </div>
  );
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
