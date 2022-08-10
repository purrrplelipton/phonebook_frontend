import React from "react";

const Form = (props) => (
  <form onSubmit={props.submit}>
    <div>
      <label>
        name
        <input
          name="phonebookEntry"
          htmlFor="name"
          value={props.name}
          onChange={props.nameChange}
        />
      </label>
    </div>
    <div>
      <label>
        number
        <input
          name="phonebookEntry"
          htmlFor="number"
          value={props.number}
          onChange={props.numChange}
        />
      </label>
    </div>
    <button type="submit">Save Contact</button>
  </form>
);

export default Form;
