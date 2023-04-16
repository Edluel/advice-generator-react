import React, { useState } from "react";

export default function SearchContainer(props) {
  const {setData, setIsPending} = props;
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("id");

  function handleSearchInput(event) {
    setSearchValue(event.target.value);
  }

  function handleSearchType(event) {
    setSearchType(event.target.value);
  }

  async function searchAdvice() {
    setIsPending(true);

    if (searchType === "id") {
      if (isNaN(searchValue)) {
        const response = await fetch('https://api.adviceslip.com/advice/'+0);
        const advice = await response.json();
        setData(advice);
        return;
      }
      const response = await fetch('https://api.adviceslip.com/advice/'+searchValue);
      const advice = await response.json();
      setData(advice);
    }

    if (searchType === "word" ){
      const response = await fetch('https://api.adviceslip.com/advice/search/'+searchValue);
      const advice = await response.json();
      setData(advice)
    }

  }

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-input"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchInput}
        pattern={searchType === "id" ? "[0-9]*" : "[A-Za-z]*"}
      />
      <select id="search-type" value={searchType} onChange={handleSearchType}>
        <option value="id">ID</option>
        <option value="word">Word</option>
      </select>
      <button id="search-button" onClick={searchAdvice}>
        Search
      </button>
    </div>
  );
}


