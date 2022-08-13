import React, { useState, useEffect } from "react";

import Aux from "./components/hoc/Auxiliary";
import Filter from "./components/Filter/Filter";
import Notification from "./components/Notification/Notification";
import Form from "./components/Form/Form";
import personsService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    success: null,
    message: null,
  });

  useEffect(() => {
    personsService
      .getAll()
      .then((dbPersons) => setPersons([...dbPersons]))
      .catch((error) => {
        setErrorMessage({ success: false, message: error.message });
        setTimeout(
          () => setErrorMessage({ success: null, message: null }),
          3000
        );
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      persons.find(
        (p) =>
          p.name.toLowerCase() === name.toLowerCase() &&
          p.number.replace(/\D/g, "") !== number.replace(/\D/g, "")
      )
    ) {
      const confirmChange = window.confirm(
        `${name.toUpperCase()} is already in the phonebook, replace  number ?`
      );
      if (confirmChange) {
        const personToChange = persons.find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        const id = personToChange.id;
        const newPerson = { ...personToChange, number: number };
        personsService
          .update(id, newPerson)
          .then((changedPerson) => {
            setPersons([
              ...persons.map((p) => (p.id !== id ? p : changedPerson)),
            ]);
            setErrorMessage({
              success: true,
              message: `changed ${personToChange.name.toUpperCase()}'s number`,
            });
            setTimeout(() => {
              setErrorMessage({ success: null, message: null });
            }, 3000);
          })
          .catch((err) => {
            const {
              ok,
              code,
              codeName,
              keyPattern,
              keyValue,
              $clusterTime,
              operationtime,
            } = err.response.data.error;
            setErrorMessage({
              success: false,
              message: `a contact with ${Object.keys(keyValue)[0]}: ${
                Object.values(keyValue)[0]
              }, already exists`,
            });
            setTimeout(
              () => setErrorMessage({ success: null, message: null }),
              3000
            );
          });
      } else {
        setErrorMessage({
          success: false,
          message: `declined replacing ${name.toUpperCase()}'s number`,
        });
        setTimeout(
          () => setErrorMessage({ success: null, message: null }),
          3000
        );
      }
    } else if (
      !persons.find((p) => p.name.toLowerCase() === name.toLowerCase())
    ) {
      const personObject = {
        name: name,
        number: number,
        id: persons.length + 1,
      };
      personsService
        .create(personObject)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          setErrorMessage({
            success: true,
            message: `added ${personObject.name.toUpperCase()}`,
          });
          setName("");
          setNumber("");
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3000
          );
        })
        .catch((err) => {
          const [, , message] = err.response.data.error.split(/:\s/);
          setErrorMessage({
            success: false,
            message: message.split(/,\s/)[0],
          });
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3000
          );
        });
    } else {
      setErrorMessage({ success: false, message: "duplicate info" });
      return setTimeout(
        () => setErrorMessage({ success: null, message: null }),
        3000
      );
    }
  };

  const deletePersonHandler = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(
      `remove ${person.name.toUpperCase()} ?`
    );
    if (confirmDelete) {
      personsService
        .remove(id)
        .then(() => {
          setPersons([...persons.filter((p) => p.id !== id)]);
          setErrorMessage({
            success: true,
            message: `removed ${person.name.toUpperCase()} from phonebook`,
          });
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3000
          );
        })
        .catch((err) => {
          setErrorMessage({ success: false, message: err.message });
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3000
          );
        });
    } else {
      setErrorMessage({
        success: true,
        message: `declined deleting ${person.name.toUpperCase()}'s contact`,
      });
      return setTimeout(
        () => setErrorMessage({ success: null, message: null }),
        3000
      );
    }
  };

  const changeFilterQuery = (event) => setFilterQuery(event.target.value);

  const formNameChange = (event) => setName(event.target.value);
  const formNumChange = (event) => setNumber(event.target.value);

  return (
    <Aux>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <label>
        Filter By
        <input onChange={changeFilterQuery} value={filterQuery} />
      </label>
      <h1>add new contact</h1>
      <Form
        submit={submitHandler}
        name={name}
        nameChange={formNameChange}
        number={number}
        numChange={formNumChange}
      />
      <h1>numbers</h1>
      <div className="phonebook-entries">
        <Filter
          persons={persons}
          query={filterQuery}
          clicked={deletePersonHandler}
        />
      </div>
    </Aux>
  );
};

export default App;
