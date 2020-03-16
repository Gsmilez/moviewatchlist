import React from "react";
const Search = ({ handleChange, handleSubmit }) => {
  return (
    <div>
      <div>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="Search Movies"
                type="text"
                onChange={handleChange}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Search;
