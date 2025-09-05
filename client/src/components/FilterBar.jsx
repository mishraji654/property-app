import React from 'react';

export default function FilterBar({ filterType, setFilterType, search, setSearch }) {
  return (
    <div className="filterbar">
      <input
        placeholder="Search by name or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="All">All</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Plot">Plot</option>
      </select>
    </div>
  );
}
