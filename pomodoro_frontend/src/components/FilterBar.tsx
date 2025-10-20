import React from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import type { DateRange } from "../types/DateRange";

interface FilterOptionsProps {
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
}: FilterOptionsProps) {
  return (
    <section className="flex items-center gap-4 p-4 flex-wrap filter-contenedor">
      {/* Select de Tags */}
      <div className="relative w-[180px]">
        <label
          htmlFor="tag-select"
          className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-black/60 pointer-events-none z-10"
        >
          All Tags
        </label>
        <select
          id="tag-select"
          className="filter-select w-full h-12 px-4 text-lg text-black/85 bg-white border border-black/15 rounded-lg outline-none transition-all duration-200 cursor-pointer appearance-none pr-10 hover:border-black/30 hover:shadow-md focus:border-black/50 focus:shadow-lg"
          value={tag}
          onChange={(e) => onTagChange(e.target.value)}
        >
          <option value="">All Tags</option>
          {availableTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <Icon
          path={mdiChevronDown}
          size={1}
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-black/60"
        />
      </div>

      {/* Fecha de inicio */}
      <div className="relative w-[180px] filter-contenedor">
        <label
          htmlFor="start-date"
          className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-black/60 pointer-events-none z-10"
        >
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          className="filter-date-input w-full h-12 px-4 text-lg text-black/85 bg-white border border-black/15 rounded-lg outline-none transition-all duration-200 cursor-pointer hover:border-black/30 hover:shadow-md focus:border-black/50 focus:shadow-lg [appearance:auto]"
          value={dateRange.startDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            onDateRangeChange({
              ...dateRange,
              startDate: new Date(e.target.value),
            })
          }
          style={{
            backgroundImage: "none",
          }}
        />
      </div>

      {/* Fecha de fin */}
      <div className="relative w-[180px] filter-contenedor">
        <label
          htmlFor="end-date"
          className="absolute -top-2 left-3 px-1 bg-white text-xs font-medium text-black/60 pointer-events-none z-10"
        >
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          className="filter-date-input w-full h-12 px-4 text-lg text-black/85 bg-white border border-black/15 rounded-lg outline-none transition-all duration-200 cursor-pointer hover:border-black/30 hover:shadow-md focus:border-black/50 focus:shadow-lg [appearance:auto]"
          value={dateRange.endDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            onDateRangeChange({
              ...dateRange,
              endDate: new Date(e.target.value),
            })
          }
          style={{
            backgroundImage: "none",
          }}
        />
      </div>
    </section>
  );
}

export default FilterBar;
