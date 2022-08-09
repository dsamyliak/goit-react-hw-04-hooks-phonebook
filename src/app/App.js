import css from "./App.module.css";
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import ContactItem from "../components/ContactItem";
import Filter from "../components/Filter";

export default function App() {
  const [contacts, setContacts] = useState(
    () => [] || localStorage.getItem("contacts")
  );
  const [filterPhonebook, setFilterPhonebook] = useState("");

  const formSubmitHandler = (newContact) => {
    const checkedContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (checkedContact) {
      alert(newContact.name + " is already in contacts.");
      return;
    }
    setContacts((contacts) => [newContact, ...contacts]);
  };

  const changeFilter = (e) => {
    setFilterPhonebook(e.currentTarget.value);
  };

  const deleteContact = (ContactId) => {
    setContacts(() => contacts.filter((contact) => contact.id !== ContactId));
  };

  // DidMount
  useEffect(() => {
    const contacts = localStorage.getItem("contacts");

    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts) {
      return;
    }
    setContacts(parsedContacts);
  }, []);

  // DidUpdate
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterPhonebook.toLowerCase())
  );

  return (
    <div className={css.App}>
      <h1 className={css.headerOptions}>Phonebook</h1>
      <ContactForm className="ContactForm" onSubmit={formSubmitHandler} />

      <h2 className={css.headerOptions}>Contacts</h2>
      <Filter value={filterPhonebook} onChange={changeFilter} />
      <ContactList
        className="ContactList"
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      >
        <ContactItem />
      </ContactList>
    </div>
  );
}
