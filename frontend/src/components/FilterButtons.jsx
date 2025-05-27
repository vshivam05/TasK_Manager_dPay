import React from "react";

const FilterButtons = ({ currentFilter, onChangeFilter }) => {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="mb-4 flex space-x-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChangeFilter(filter)}
          className={`px-4 py-2 rounded ${
            currentFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
