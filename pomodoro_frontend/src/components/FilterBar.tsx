import React from "react";
import type { DateRange } from "../types/DateRange";

interface filterOptionsProps {
  tag: string;
  dateRange: DateRange;
  onTagChange: (newTag: string) => void;
  onDateRangeChange: (newDateRange: DateRange) => void;
  availableTags: { id: string; name: string }[];
}

function FilterBar({
  tag,
  dateRange,
  onTagChange,
  onDateRangeChange,
  availableTags,
}: filterOptionsProps) {
  return (
    <div className="filter-container">
      <h3>Filter controls</h3>
      <div className="tag-filter">
        <label htmlFor="tag-select">Select Tag:</label>
        <select
          id="tag-select"
          value={tag}
          onChange={(e) => onTagChange(e.target.value)}
        >
          <option value="">All</option>
          {availableTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <div className="date-filter">
        <label htmlFor="start-date">Start Date:</label>
        <input
          id="start-date"
          type="date"
          value={dateRange.startDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            onDateRangeChange({
              ...dateRange,
              startDate: new Date(e.target.value),
            })
          }
        />
        <label htmlFor="end-date" style={{ marginLeft: "10px" }}>
          End Date:
        </label>
        <input
          id="end-date"
          type="date"
          value={dateRange.endDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            onDateRangeChange({
              ...dateRange,
              endDate: new Date(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}

export default FilterBar;
