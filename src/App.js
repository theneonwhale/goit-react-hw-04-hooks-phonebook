import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import Notification from './components/Notification/Notification';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: uuidv4(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: uuidv4(), name: 'Hermione Kline', number: '443-89-12' },
    { id: uuidv4(), name: 'Eden Clements', number: '645-17-79' },
    { id: uuidv4(), name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const id = uuidv4();
    const contact = { name, number, id };

    contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
    )
      ? toast.dark(`🦝 ${name} is already in contacts.`, { autoClose: 3000 })
      : setContacts(() => [contact, ...contacts]);
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(() => contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Container>
      <Section title="Phone book">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && (
          <Filter value={filter} onChange={changeFilter} />
        )}
        {visibleContacts.length ? (
          <ContactList
            contacts={visibleContacts.length ? visibleContacts : contacts}
            onDeleteContact={deleteContact}
          />
        ) : (
          <Notification message="Nothing to show." />
        )}
        <ToastContainer />
      </Section>
    </Container>
  );
}
