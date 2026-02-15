import React from 'react';
import '../styles/SearchFilters.css';

const SearchFilters = ({ filters, onFilterChange, onClear }) => {
  const categories = [
    'All',
    'Technology',
    'Business',
    'Art',
    'Music',
    'Sports',
    'Education',
    'Other'
  ];

  return (
    <div className="search-filters">
      <h3 className="search-filters-title">🔍 Search & Filter Events</h3>
      
      <div className="search-filters-grid">
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Search events, organizers..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Location</label>
          <input
            type="text"
            className="filter-input"
            placeholder="City, State"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Date</label>
          <input
            type="date"
            className="filter-input"
            value={filters.date}
            onChange={(e) => onFilterChange('date', e.target.value)}
          />
        </div>
      </div>

      <div className="search-filters-actions mt-3">
        <button className="btn-clear" onClick={onClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
