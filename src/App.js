import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact } from "./redux/contacts/contacts-actions";
import filterAction from "./redux/filter/filter-actions";

import shortid from "shortid";

import style from "./App.module.css";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

function App() {
  //   contacts: [
  //     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ]

  const dispatch = useDispatch();
  const contactsList = useSelector((state) => state.contacts.items);
  const inputValueFilter = useSelector((state) => state.contacts.filter);

  const addContacts = ({ name, number }) => {
    if (contactsList.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    dispatch(addContact(contact));
  };

  const filterHendler = ({ target }) => dispatch(filterAction(target.value));

  const filterContacts = () => {
    const normalizedFilter = inputValueFilter.toLocaleLowerCase();

    return contactsList.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContactFromId = ({ target }) =>
    dispatch(deleteContact(target.id));

  return (
    <div className={style.container}>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter filter={inputValueFilter} onChange={filterHendler} />
      <ContactList contacts={filterContacts()} onDelete={deleteContactFromId} />
    </div>
  );
}

export default App;
