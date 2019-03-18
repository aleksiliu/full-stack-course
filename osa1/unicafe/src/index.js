import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Anna palauetta</h1>
        <button onClick={() => setGood(good + 1)}>Hyvä</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutraali</button>
        <button onClick={() => setBad(bad + 1)}>Huono</button>
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
