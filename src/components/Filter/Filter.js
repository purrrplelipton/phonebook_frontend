import React from "react";

import Person from "../Person/Person";

const Filter = ({ query, persons, clicked }) => {
  const regex = new RegExp(query, "i"),
    personsQuery = persons.filter((prsn) => regex.test(prsn.name));

  if (personsQuery.length > 0) {
    return persons
      .filter((person) => regex.test(person.name))
      .map((prsn, i) => (
        <div className={`person prsn-${i}`} key={prsn.id}>
          <Person person={prsn} clicked={clicked} />
        </div>
      ));
  } else {
    return <p>No contacts found.</p>;
  }
};

export default Filter;
