import { useCallback, useEffect, useState } from "react";
import "./SearchFilterPanel.css";

export default function SearchFilterPanel({
  onSearch = () => {},
  onFilterChange = () => {},
  filterOptions = [],
  searchPlaceholder = "Search...",
  showSearchIcon = true,
  showResetBtn = true,
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleFilterChange = useCallback(
    (filterKey, value) => {
      const newFilters = { ...filters, [filterKey]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [filters, onFilterChange]
  );

  const handleReset = () => {
    setSearchTerm("");
    setFilters({});
    onSearch("");
    onFilterChange({});
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const activeFilterCount = Object.values(filters).filter(
    (val) => val !== "" && val !== null && val !== false
  ).length;

  return (
    <div className={`search-filter-panel ${className}`}>
      {/* Search Bar */}
      <div className="search-bar">
        {showSearchIcon && <span className="search-icon">🔍</span>}
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={handleClearSearch}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Toggle Button */}
      {filterOptions.length > 0 && (
        <button
          className="filter-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          title="Toggle filters"
        >
          <span className="filter-icon">⚙️</span>
          <span className="filter-text">Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
          <span className={`toggle-icon ${isExpanded ? "open" : ""}`}>▼</span>
        </button>
      )}

      {/* Reset Button */}
      {showResetBtn && (searchTerm || activeFilterCount > 0) && (
        <button className="reset-btn" onClick={handleReset} title="Reset all filters">
          🔄 Reset
        </button>
      )}

      {/* Filters Panel */}
      {filterOptions.length > 0 && isExpanded && (
        <div className="filters-panel">
          <div className="filters-grid">
            {filterOptions.map((filter) => (
              <div key={filter.key} className="filter-group">
                <label className="filter-label">{filter.label}</label>

                {filter.type === "select" && (
                  <select
                    value={filters[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All {filter.label}</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === "checkbox" && (
                  <div className="filter-checkbox-group">
                    {filter.options?.map((option) => (
                      <label key={option.value} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(filters[filter.key])
                              ? filters[filter.key]?.includes(option.value)
                              : false
                          }
                          onChange={(e) => {
                            const currentValues = filters[filter.key] || [];
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter((v) => v !== option.value);
                            handleFilterChange(filter.key, newValues);
                          }}
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {filter.type === "date" && (
                  <input
                    type="date"
                    value={filters[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="filter-date"
                  />
                )}

                {filter.type === "daterange" && (
                  <div className="filter-daterange-group">
                    <input
                      type="date"
                      placeholder="From"
                      value={filters[`${filter.key}_from`] || ""}
                      onChange={(e) =>
                        handleFilterChange(`${filter.key}_from`, e.target.value)
                      }
                      className="filter-date"
                    />
                    <span className="daterange-separator">to</span>
                    <input
                      type="date"
                      placeholder="To"
                      value={filters[`${filter.key}_to`] || ""}
                      onChange={(e) =>
                        handleFilterChange(`${filter.key}_to`, e.target.value)
                      }
                      className="filter-date"
                    />
                  </div>
                )}

                {filter.type === "number" && (
                  <input
                    type="number"
                    placeholder={filter.placeholder || "Enter value"}
                    value={filters[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="filter-number"
                    min={filter.min}
                    max={filter.max}
                  />
                )}

                {filter.type === "text" && (
                  <input
                    type="text"
                    placeholder={filter.placeholder || "Enter value"}
                    value={filters[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="filter-text-input"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Filter Actions */}
          <div className="filter-actions">
            <button
              className="filter-apply-btn"
              onClick={() => setIsExpanded(false)}
            >
              ✓ Apply Filters
            </button>
            {(searchTerm || activeFilterCount > 0) && (
              <button className="filter-clear-btn" onClick={handleReset}>
                Clear All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
