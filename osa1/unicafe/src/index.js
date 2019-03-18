import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = value => {
    setGood(value + 1);
  };

  const handleNeutral = value => {
    setNeutral(value + 1);
  };

  const handleBad = value => {
    setBad(value + 1);
  };

  return (
    <>
      <div>
        <h1>Anna palauetta</h1>
        <button onClick={() => handleGood(good)}>Hyvä</button>
        <button onClick={() => handleNeutral(neutral)}>Neutraali</button>
        <button onClick={() => handleBad(bad)}>Huono</button>
      </div>
      <div>
        <h2>Statistiikka</h2>
        <p>Hyvä {good}</p>
        <p>Neutraali {neutral}</p>
        <p>Huono {bad}</p>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
