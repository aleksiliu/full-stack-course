import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://restcountries.eu/rest/v2/all');
      setCountries(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (weatherLocation) {
      const fetchDataa = async () => {
        const result = await axios(
          `http://api.apixu.com/v1/current.json?key=5401139303d34fad9ac202237190904&q=${weatherLocation}`
        );
        setWeatherData(result.data);
      };
      fetchDataa();
    }
  }, [weatherLocation]);

  const filteredCountries = countries.filter(countryName =>
    countryName.name.toLowerCase().includes(country.toLowerCase())
  );

  const List = () => {
    let listOfCountries;
    if (filteredCountries.length >= 250) {
      return null;
    } else if (filteredCountries.length > 10) {
      listOfCountries = <p>Too many matches. Try again</p>;
    } else if (filteredCountries.length === 1) {
      listOfCountries = (
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
                style={{ width: 200, height: 150, marginTop: 20 }}
              />
              {setWeatherLocation(country.capital)}
            </div>
          ))}
          {weatherData.current ? (
            <div>
              <h2>Weather in {weatherLocation}</h2>
              <p>temperature: {weatherData.current.temp_c} celcius</p>
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.icon}
                style={{ width: 100, height: 100 }}
              />
              <p>
                wind: {weatherData.current.wind_kph} kph direction {weatherData.current.wind_dir}{' '}
              </p>
            </div>
          ) : null}
        </div>
      );
    } else {
      listOfCountries = (
        <div>
          {filteredCountries.map(country => (
            <p key={country.numericCode}>{country.name}</p>
          ))}
        </div>
      );
    }

    return listOfCountries;
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
