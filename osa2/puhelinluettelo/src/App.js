import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto',
      phone: '23324',
      id: 1
    },
    {
      name: 'Seppo',
      phone: '23322133214',
      id: 2
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setPhoneNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (persons.some(person => person.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName.charAt(0).toUpperCase() + newName.slice(1)} on jo luettelossa`);
    } else {
      const personObject = {
        name: newName,
        phone: newPhone,
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
      <form onSubmit={handleSubmit}>
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
        {persons.map(person => (
          <p key={person.id}>
            {person.name} {person.phone}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
