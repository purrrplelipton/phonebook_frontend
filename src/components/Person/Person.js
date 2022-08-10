import React from "react";
import Aux from "../hoc/Auxiliary";

const Person = ({ person, clicked }) => (
  <Aux>
    <p>
      <span className="contact-name">{person.name}</span> {person.number}{" "}
    </p>
    <button onClick={() => clicked(person.id)}>delete</button>
  </Aux>
);

export default Person;
