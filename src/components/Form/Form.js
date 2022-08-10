import React from "react";

const Form = (props) => {
  const current = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={props.submit}>
      <div>
        <label>
          name
          <input
            name="phonebookEntry"
            htmlFor="name"
            placeholder="name"
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
            placeholder="number"
            value={props.number}
            onChange={props.numChange}
          />
        </label>
      </div>
      <div>
        <label>
          e-mail
          <input
            type="email"
            name="phonebookEntry"
            htmlFor="e-mail"
            placeholder="e-mail"
            value={props.email}
            onChange={props.emailChange}
          />
        </label>
      </div>
      <div>
        <label>
          address
          <input
            name="phonebookEntry"
            htmlFor="address"
            placeholder="address"
            value={props.address}
            onChange={props.addressChange}
          />
        </label>
      </div>
      <div>
        <label>birthday</label>
        <input
          type="date"
          name="phonebookEntry"
          htmlFor="birthday"
          placeholder="birthday"
          value={props.birthdate}
          onChange={props.birthdateChange}
          max={current}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => props.genderChange(e.target.value)}
            checked={props.gender === "male"}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => props.genderChange(e.target.value)}
            checked={props.gender === "female"}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="non-binary"
            onChange={(e) => props.genderChange(e.target.value)}
            checked={props.gender === "non-binary"}
          />
          Non-Binary
        </label>
      </div>
      <button type="submit">Save Contact</button>
    </form>
  );
};

export default Form;
