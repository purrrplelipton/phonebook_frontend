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
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("non-binary");
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
          3700
        );
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const checkPerson = persons.find(
      (prsn) => prsn.name.toLowerCase() === name.toLowerCase()
    );

    const newPerson = {
      name: name,
      number: number,
      email: email,
      address: address,
      birthdate: birthdate,
      gender: gender,
      id: persons.length + 1,
      date: new Date(),
    };

    if (checkPerson) {
      console.log(
        Object.keys(newPerson).forEach((x) => {
          checkPerson[x]
            ? console.log(checkPerson[x])
            : console.log("personObj doesnt have", x, "property");
        })
      );

      const confirmChange = window.confirm(
        `${checkPerson.name.toUpperCase()} already in the phonebook, replace changed details ?`
      );

      if (confirmChange) {
        const newPerson = { ...checkPerson, number: number };
        personsService
          .update(checkPerson.id, newPerson)
          .then((changedPerson) => {
            setPersons([
              ...persons.map((p) =>
                p.id !== checkPerson.id ? p : changedPerson
              ),
            ]);
            setErrorMessage({
              success: true,
              message: `changed ${checkPerson.name.toUpperCase()}'s ${"number"}`,
            });
            setTimeout(
              () => setErrorMessage({ success: null, message: null }),
              3700
            );
          })
          .catch((error) => {
            setErrorMessage({
              success: false,
              message: error.message,
            });
            setTimeout(
              () => setErrorMessage({ success: null, message: null }),
              3700
            );
          });
      } else {
        setErrorMessage({
          success: false,
          message: `declined replacing ${name.toUpperCase()}'s details`,
        });
        setTimeout(
          () => setErrorMessage({ success: null, message: null }),
          3700
        );
      }
    } else {
      personsService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          setErrorMessage({
            success: true,
            message: `added ${name.toUpperCase()}`,
          });
          setName("");
          setNumber("");
          setEmail("");
          setAddress("");
          setBirthdate("");
          setGender("non-binary");
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3700
          );
        })
        .catch((err) => {
          const [, , message] = err.response.data.error.split(/(:\s)/u);
          setErrorMessage({
            success: false,
            message: message.split(/,\s/u)[0],
          });
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3700
          );
        });
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
            success: false,
            message: `removed ${person.name.toUpperCase()} from phonebook`,
          });
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3700
          );
        })
        .catch((error) => {
          setErrorMessage({ success: false, message: error.message });
          setTimeout(
            () => setErrorMessage({ success: null, message: null }),
            3700
          );
        });
    } else {
      setErrorMessage({
        success: true,
        message: `declined deleting ${person.name}'s contact`,
      });
      return setTimeout(
        () => setErrorMessage({ success: null, message: null }),
        3700
      );
    }
  };

  const changeFilterQuery = (event) => setFilterQuery(event.target.value);

  const formNameChange = (event) => setName(event.target.value);
  const formNumChange = (event) => setNumber(event.target.value);
  const formEmailChange = (event) => setEmail(event.target.value);
  const formAddressChange = (event) => setAddress(event.target.value);
  const formBirthdateChange = (event) => setBirthdate(event.target.value);
  const formGenderChange = (value) => setGender(value);

  return (
    <Aux>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <input placeholder="filter by..." onChange={changeFilterQuery} />
      <h1>add new contact</h1>
      <Form
        submit={submitHandler}
        name={name}
        nameChange={formNameChange}
        number={number}
        numChange={formNumChange}
        email={email}
        emailChange={formEmailChange}
        address={address}
        addressChange={formAddressChange}
        birthdate={birthdate}
        birthdateChange={formBirthdateChange}
        gender={gender}
        genderChange={formGenderChange}
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
