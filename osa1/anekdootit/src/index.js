import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = props => {
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const indexOfMaxValue = points.indexOf(Math.max(...points));

  return (
    <>
      <div>
        <p>
          {props.anecdotes[selected]} has <br />
          {points[selected]} votes
        </p>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleRandom}>generate</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {Math.max(...points) > 0 ? (
          <p>
            {props.anecdotes[indexOfMaxValue]} <br />
            has {Math.max(...points)} votes
          </p>
        ) : (
          <p>Vote Bruh!</p>
        )}
      </div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
