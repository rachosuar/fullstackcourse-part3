import React, { useEffect, useState } from "react";
import Contacts from "./components/contacts";
import Filter from "./components/filter";
import AddContact from "./components/addcontact";
import phonebook from "./services/phonebook";
import Notifications from "./components/notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newFilter, setNewFilter] = useState(true);
  const [message, setMessage] = useState({ data: null, clases: "" });

  useEffect(() => {
    phonebook.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const changeName = (event) => {
    setNewName(event.target.value);
  };
  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilterValue(event.target.value);
    event.target.value ? setNewFilter(true) : setNewFilter(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).length > 0 &&
      persons.filter((person) => person.number === newNumber).length > 0
    ) {
      setMessage({ data: `${newName} already exist`, clases: "message" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else if (
      persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).length > 0 &&
      window.confirm(
        `${newName} already exist do you wish to change the number?`
      )
    ) {
      let id = persons.filter(
        (person) => newName.toLowerCase() === person.name.toLowerCase()
      )[0].id;
      phonebook
        .changePhone(id, newPerson)
        .then((response) => {
          if (response.name) {
            setPersons(
              persons.map((person) => (person.id !== id ? person : response))
            );
            setMessage({
              data: `${newName} phone number was changed`,
              clases: "errorMessage",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          } else if (response.error) {
            setMessage({
              data: `${response.error}`,
              clases: "errorMessage",
            });
          }
        })
        .catch((err) =>
          setMessage({
            data: `${err.error}`,
            clases: "errorMessage",
          })
        );
    }
    if (
      persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).length == 0
    ) {
      phonebook
        .newPerson(newPerson)
        .then((response) => {
          if (response.name) {
            setPersons([...persons, response]);
            setMessage({
              data: `${response.name} was added to the phonebook`,
              clases: "message",
            });

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          } else if (response.error) {
            setMessage({
              data: `${response.error}`,
              clases: "errorMessage",
            });
            setTimeout(() => {
              setMessage(null);
            }, 7000);
          }
        })
        .catch((err) => {
          setMessage({
            data: `${err.error}`,
            clases: "errorMessage",
          });
        });
    }
  };

  const filter = persons.filter(
    (person) =>
      person.name.slice(0, filterValue.length).toLowerCase() ===
      filterValue.toLowerCase()
  );
  //

  const contactToShow = newFilter ? filter : persons;

  const handleClick = (person) => {
    let toDelete = [];
    if (window.confirm(`delete ${person.name}?`)) {
      toDelete = persons.slice(
        persons.indexOf(person),
        persons.indexOf(person) + 1
      );
      setPersons(persons.filter((person) => person.id !== toDelete[0].id));
      phonebook.remove(toDelete[0].id);
    }
    setMessage({
      data: `${toDelete[0].name} was deleted from phonebook`,
      clases: "errorMessage",
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? (
        <Notifications message={message.data} clases={message.clases} />
      ) : (
        <h2>Notifications</h2>
      )}
      <Filter handleFilter={handleFilter} />
      <h1>Add a new number</h1>
      <AddContact
        handleSubmit={handleSubmit}
        changeName={changeName}
        changeNumber={changeNumber}
      />
      {
        <Contacts
          persons={contactToShow}
          handleClick={(person) => handleClick(person)}
        />
      }
    </div>
  );
};

export default App;
