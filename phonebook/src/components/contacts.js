import React from "react";

const Contacts = ({ persons, handleClick }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          <h3>
            {person.name.toUpperCase()} ---> {person.number}{" "}
            <button onClick={() => handleClick(person)}> delete </button>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
