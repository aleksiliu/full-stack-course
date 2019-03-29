import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');

  const handleChange = e => {
    setNewName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1
    };
    setPersons(persons.concat(personObject));
    setNewName('');
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          nimi: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div>
        {persons.map(person => (
          <p key={person.id}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
