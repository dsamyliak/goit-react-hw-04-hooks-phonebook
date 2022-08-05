import "./App.css";
import { useState, useEffect } from "react";
// import React from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactItem from "./components/ContactItem";
import Filter from "./components/Filter";
// import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export default function App() {
  const [contacts, setContacts] = useState(
    localStorage.getItem("contacts") && []
  );
  const [filter, setFilter] = useState("");

  const formSubmitHandler = (handleSubmitContact) => {
    console.log("contact handleSubmit", handleSubmitContact);

    const checkedContact = contacts.find(
      (contact) =>
        contact.name.toLowerCase() === handleSubmitContact.name.toLowerCase()
    );

    if (checkedContact) {
      console.log(
        "checkedContact name is the same as old contact -",
        handleSubmitContact.name
      );
      alert(handleSubmitContact.name + " is already in contacts.");
      return;
    }
    setContacts((contacts) => [handleSubmitContact, ...contacts]);
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = (ContactId) => {
    console.log("deleteContact ok");
    setContacts(() => contacts.filter((contact) => contact.id !== ContactId));
  };

  // DidMount
  useEffect(() => {
    console.log("DidMount done by useEffect");
    const contacts = localStorage.getItem("contacts");

    const parsedContacts = JSON.parse(contacts);
    console.log("parsedContacts = ", parsedContacts);

    if (!parsedContacts) {
      return;
    }
    setContacts(parsedContacts);
  }, []);

  // DidUpdate
  useEffect(() => {
    console.log("useEffect DidUpdate - Update every change of contacts");
    localStorage.setItem("contacts", JSON.stringify(contacts));
    // console.log("filteredContacts", filteredContacts);
  }, [contacts]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1 className="headerOptions">Phonebook</h1>
      <ContactForm className="ContactForm" onSubmit={formSubmitHandler} />

      <h2 className="headerOptions">Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
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

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};

// class App extends React.Component {
//   state = {
//     contacts: [
//       // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   formSubmitHandler = (newContact, name, number) => {
//     console.log("newContact", newContact);
//     // console.log("name, number", name + "," + number);

//     const checkedContact = this.state.contacts.find(
//       (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
//     );

//     if (!checkedContact) {
//       newContact.id = nanoid();

//       this.setState((prevState) => ({
//         contacts: [newContact, ...prevState.contacts],
//       }));
//     } else {
//       console.log(
//         "checkedContact name is the same as old contact -",
//         newContact.name
//       );
//       alert(newContact.name + " is already in contacts.");
//     }
//   };

//   deleteContact = (ContactId) => {
//     console.log("delete button work");

//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== ContactId
//       ),
//     }));
//   };

//   changeFilter = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   componentDidMount() {
//     console.log("3 DidMount done!");

//     const contacts = localStorage.getItem("contacts");
//     console.log("DidMount contacts = ", contacts);

//     const parsedContacts = JSON.parse(contacts);
//     console.log("parsedContacts = ", parsedContacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log("2 DidUpdate done");
//     console.log("this.state = ", this.state);
//     console.log("prevState = ", prevState);

//     if (this.state.contacts !== prevState.contacts) {
//       console.log("Updated contacts!!!");
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     console.log("1 Render done!");

//     //calculating data
//     //_________________

//     const { contacts, filter } = this.state;

//     const toLowerCaseFilter = filter.toLowerCase();

//     const filteredContacts = contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(toLowerCaseFilter)
//     );

//     console.log(contacts);

//     //render webpage
//     //______________

//     return (
//       <div className="App">
//         <h1 className="headerOptions">Phonebook</h1>
//         <ContactForm
//           className="ContactForm"
//           onSubmit={this.formSubmitHandler}
//         />

//         <h2 className="headerOptions">Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList
//           className="ContactList"
//           contacts={filteredContacts}
//           onDeleteContact={this.deleteContact}
//         >
//           <ContactItem />
//         </ContactList>
//       </div>
//     );
//   }
// }

// export default App;
