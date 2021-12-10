import React from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { useState } from "react";
const Search = (props) => {
  const [searchQuery, goSearch] = useState("");
  const handleSearch = (event) => {
    goSearch(event.target.value);
  };
  const handleButton = (event) => {
    var searchquery = { searchQuery };
  };

  return (
    <form action="#" className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
    </form>
  );
};
export default Search;
