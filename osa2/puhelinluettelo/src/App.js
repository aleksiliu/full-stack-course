import React, { useState, useEffect } from 'react';
import './index.css';
import noteService from './services/persons';

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
    noteService.getAll().then(initialPersons => {
      setPersons(initialPersons);
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

        const objIndex = persons.findIndex(obj => obj.name === newName);

        const updatedObj = { ...persons[objIndex], number: newPhone };

        noteService
          .update(name.id, updatedObj)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            );
            setPersons(updatedPersons);
            setNotificationMessage(`${newName} numero muutettu muotoon ${newPhone} `);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 4000);
            setNewName('');
            setPhoneNumber('');
          })
          .catch(error => {
            console.log(error);
            setNotificationMessage(`${newName} on jo valitettavasti poistettu palvelimelta`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 4000);
            setNewName('');
            setPhoneNumber('');
            setPersons(persons.filter(person => person.id !== updatedObj.id));
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone
      };
      noteService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setPhoneNumber('');
          setNotificationMessage(`${newName} lisätty`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const removeContact = id => {
    const singlePerson = persons.find(person => person.id === id);

    const result = window.confirm(
      `Oletko varma että haluat poistaa henkilön ${singlePerson.name}?`
    );

    if (result) {
      noteService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMessage(
            `${singlePerson.name} poistettu numerolla ${singlePerson.number} `
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
        })
        .catch(error => {
          console.log(error);
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
      <ul>
        {persons
          .filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
          .map(person => (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => removeContact(person.id)}>remove</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
