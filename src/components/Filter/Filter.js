import React from "react";

import Person from "../Person/Person";

const Filter = ({ query, persons, clicked }) => {
  const regex = new RegExp(query, "i");

  return persons
    .filter((person) => regex.test(person.name))
    .map((prsn, i) => (
      <div className={`person prsn-${i}`} key={prsn.id}>
        <Person person={prsn} clicked={clicked} />
      </div>
    ));
};

export default Filter;
