// SPDX-License-Identifier: MIT
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function Search(props: { onSearch: Function }) {
  const [filterText, setFilterText] = useState<string | undefined>(undefined);

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type here to filter..."
        aria-label="Filter"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.onSearch(filterText);
          } else if (e.currentTarget.value.length === 0) {
            props.onSearch(filterText);
          }
        }}
        onChange={(e) => {
          setFilterText(e.target.value);
        }}
      />

      <div className="input-group-text">
        <button
          className="border-0 bg-transparent"
          onClick={() => props.onSearch(filterText)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
