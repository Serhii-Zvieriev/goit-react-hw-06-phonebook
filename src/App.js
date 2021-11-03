import { useState, useEffect } from 'react';
import shortid from 'shortid';

import style from './App.module.css';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

function App() {
  //   contacts: [
  //     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ]

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (contacts === '') {
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const filterHendler = ({ target }) => {
    setFilter(target.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = ({ target }) => {
    const { id } = target;
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id),
    );
  };

  return (
    <div className={style.container}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={filterHendler} />
      <ContactList contacts={filterContacts()} onDelete={deleteContact} />
    </div>
  );
}

export default App;
