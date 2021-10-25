import React from "react";

const FilterPanel = ({ select, setSelect, options }) => {
  return (
    <div>
      <a className="panel-block is-active is-flex is-flex-direction-row is-justify-content-center pb-5 pt-5">
        <div className="select">
          <select
            value={select}
            onChange={(event) => setSelect(event.target.value)}
          >
            {options.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
        </div>
      </a>
    </div>
  );
};

export default FilterPanel;
