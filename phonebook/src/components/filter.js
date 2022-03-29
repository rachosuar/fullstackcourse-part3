import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <div>
      <form>
        <input onChange={handleFilter} />
      </form>
    </div>
  );
};

export default Filter;
