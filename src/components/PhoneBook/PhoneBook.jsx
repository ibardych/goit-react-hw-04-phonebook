import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PhoneBookStyled } from './PhoneBook.styled';
import { Button } from 'components/Styled';
import Section from 'components/Section/Section';
import Form from 'components/Form/Form';
import Input from 'components/Form/Input';
import Modal from 'components/Modal/Modal';
import ContactsList from 'components/ContactsList/ContactsList';
import Notification from 'components/Notification/Notification';

const PhoneBook = () => {
  const storedContacts = window.localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(storedContacts);

  const [contacts, setContacts] = useState(parsedContacts ?? []);
  const [filter, setFilter] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  const addContact = (e, { name, number }) => {
    e.preventDefault();

    if (
      contacts.some(contact => {
        return contact.name.toLowerCase() === name.toLowerCase();
      })
    ) {
      setModalMessage(`${name} is already in contacts.`);
      setModalOpened(true);
      return;
    }

    const contact = { id: nanoid(), name, number };

    setContacts(contacts => [...contacts, contact]);
  };

  const deleteAllContacts = () => {
    setContacts([]);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(item => id !== item.id));
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      setModalMessage('');
      setModalOpened(false);
    }
  };

  return (
    <PhoneBookStyled>
      <Section title="Phone book">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Input
              label="Find contacts by name or number"
              type="text"
              name="filter"
              onChange={handleFilter}
              value={filter}
            />
            <ContactsList
              onDeleteContact={deleteContact}
              filter={filter}
              contacts={contacts}
            />
            <Button type="default" onClick={deleteAllContacts}>
              Clear all contacts
            </Button>
          </>
        ) : (
          <Notification message="There is no contacts yet" />
        )}
      </Section>
      <Modal modalOpened={modalOpened} onCloseModal={closeModal}>
        {modalMessage}
      </Modal>
    </PhoneBookStyled>
  );
};

export default PhoneBook;
