import React from "react";

const AddContact = ({ handleSubmit, changeName, changeNumber }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={changeName} />
          number: <input onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
