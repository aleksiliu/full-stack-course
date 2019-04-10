import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://restcountries.eu/rest/v2/all');
      setCountries(result.data);
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter(countryName =>
    countryName.name.toLowerCase().includes(country.toLowerCase())
  );

  const List = () => {
    if (filteredCountries.length === 250) {
      return null;
    }
    if (filteredCountries.length > 10) {
      return <p>Too many matches. Try again</p>;
    } else if (filteredCountries.length === 1) {
      return (
        <div>
          {filteredCountries.map(country => (
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
          {filteredCountries.map(country => (
            <p key={country.numericCode}>{country.name}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Maat</h2>
      <input
        type="text"
        placeholder="search for country"
        value={country}
        onChange={e => setCountry(e.target.value)}
      />
      <List />
    </div>
  );
};

export default App;
