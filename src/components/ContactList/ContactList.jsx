import style from './ContactList.module.scss';

function ContactList({ contacts, onDelete }) {
  return (
    <ul className={style.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <p>
            {name}: {number}
          </p>
          <button id={id} onClick={onDelete} className={style.button}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
