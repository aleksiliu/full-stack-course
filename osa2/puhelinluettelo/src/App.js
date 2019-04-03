import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setPhoneNumber] = useState('');
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName.charAt(0).toUpperCase() + newName.slice(1)} on jo luettelossa`);
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setPhoneNumber('');
    }
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä nimellä:{' '}
        <input value={filterString} onChange={e => setFilterString(e.target.value)} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Lisää uusi</h2>
        <div>
          nimi: <input value={newName} onChange={e => setNewName(e.target.value)} />
          puhelin: <input value={newPhone} onChange={e => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div>
        {persons
          .filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
          .map(person => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;
