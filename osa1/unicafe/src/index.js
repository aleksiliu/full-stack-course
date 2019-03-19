import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad, calcAverage, calcPercentage }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>Ei yhtään palautetta annettu</p>;
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <p>Hyvä {good}</p>
      <p>Neutraali {neutral}</p>
      <p>Huono {bad}</p>
      <p>Yhteensä {good + neutral + bad}</p>
      <p>Keskiarvo {calcAverage()}</p>
      <p>Positiivisia {calcPercentage() || 0}%</p>
    </div>
  );
};

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

  const calcPercentage = () => {
    const calcGoodPercentage = (good * 100) / (good + neutral + bad);
    const value = calcGoodPercentage.toFixed(1);
    var pointNum = parseFloat(value);
    return pointNum;
  };

  const calcAverage = () => {
    const negative = Math.abs(bad) * -1;
    const average = (good - bad + 0 + negative) / 3;
    return average;
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
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          calcAverage={calcAverage}
          calcPercentage={calcPercentage}
        />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
