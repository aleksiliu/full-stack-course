import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  const CountryList = () => {
    if (countries.length > 10) {
      return <p> Too many options</p>;
    } else if (countries.length === 1) {
      return (
        <div>
          {countries.map(country => (
            <div key={country.numericCode}>
              <h2>{country.name}</h2>
              <p> capital {country.population}</p>
              <p> population {country.capital}</p>
              <h3>languages</h3>
              <>
                {country.languages.map(country => (
                  <li key={country.name}>{country.name}</li>
                ))}
              </>
              <img
                src={country.flag}
                alt={country.flag}
                style={{ width: 200, height: 200, marginTop: 20 }}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {countries.map(country => (
            <p key={country.numericCode}>{country.name}</p>
          ))}
        </div>
      );
    }
  };

  useEffect(
    () => {
      const fetchData = async () => {
        const result = await axios('https://restcountries.eu/rest/v2/all');

        setCountries(result.data.filter(x => x.name.toLowerCase().includes(country.toLowerCase())));
      };

      fetchData();
    },
    [country],
    console.log(countries)
  );

  const handleChange = event => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <h2>Maat</h2>
      <input type="text" value={country} onChange={handleChange} />
      <div>
        <CountryList />
      </div>
    </div>
  );
};

export default App;
