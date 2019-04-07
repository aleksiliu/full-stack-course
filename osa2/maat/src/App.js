import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {
        const result = await axios('https://restcountries.eu/rest/v2/all');

        setCountries(result.data);
      };

      fetchData();
    },
    [],
    console.log(countries)
  );

  return (
    <div>
      <h2>Maat</h2>
      <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
      <div>
        {countries
          .filter(person => person.name.toLowerCase().includes(country.toLowerCase()))
          .map(country => (
            <p key={country.numericCode}>{country.name}</p>
          ))}
      </div>
    </div>
  );
};

export default App;
