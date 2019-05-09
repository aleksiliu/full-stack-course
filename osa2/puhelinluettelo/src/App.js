import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setPhoneNumber] = useState('');
  const [filterString, setFilterString] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const result = window.confirm(
        `${newName.charAt(0).toUpperCase() +
          newName.slice(1)} on jo luettelossa. Haluatko korvata vanhan numeron uudella?`
      );
      if (result) {
        const name = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

        const url = `http://localhost:3001/persons/${name.id}`;

        const objIndex = persons.findIndex(obj => obj.name === newName);

        const updatedObj = { ...persons[objIndex], number: newPhone };

        console.log(updatedObj);

        axios.put(url, updatedObj).then(response => {
          const updatedPersons = [
            ...persons.slice(0, objIndex),
            response.data,
            ...persons.slice(objIndex + 1)
          ];
          console.log(updatedPersons);
          setPersons(updatedPersons);
          setNotificationMessage(`${newName} numero muutettu muotoon ${newPhone} `);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
          setNewName('');
          setPhoneNumber('');
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
        id: persons.length + 1
      };
      axios.post('http://localhost:3001/persons', personObject).then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setPhoneNumber('');
        setNotificationMessage(`${newName} lisätty`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      });
    }
  };

  const removeContact = id => {
    const singlePerson = persons.find(person => person.id === id);

    const result = window.confirm(
      `Oletko varma että haluat poistaa henkilön ${singlePerson.name}?`
    );

    if (result) {
      const url = `http://localhost:3001/persons/${id}`;

      axios.delete(url).then(response => {
        setPersons(persons.filter(note => note.id !== id));
        setNotificationMessage(`${singlePerson.name} poistettu numerolla ${singlePerson.number} `);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      });
    }
  };

  return (
    <div>
      {notificationMessage && <Notification message={notificationMessage} />}
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
              <button onClick={() => removeContact(person.id)}>remove</button>
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;
