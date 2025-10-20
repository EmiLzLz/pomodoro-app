import React, { useEffect, useState } from "react";
import { getSessions } from "../services/sessionService";
import { getTags } from "../services/tagService";
import type { Session } from "../types/Session";
import type { Tag } from "../types/Tag";
import type { DateRange } from "../types/DateRange";
import FilterBar from "../components/FilterBar";
import SessionsList from "../components/SessionsList";

function History() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    getSessions().then(setSessions);
    getTags().then(setTags);
  }, []);

  const filteredSessions = sessions.filter((session) => {
    if (!session.completedAt) return false;

    if (selectedTag && session.tag.id !== selectedTag) return false;

    const sessionDate = new Date(session.completedAt);
    if (dateRange.startDate && sessionDate < dateRange.startDate) return false;
    if (dateRange.endDate && sessionDate > dateRange.endDate) return false;

    return true;
  });

  return (
    <main className="min-h-screen flex justify-center items-start py-16 bg-gradient-to-br from-teal-50 to-cyan-100">
      <div className="max-w-[1100px] w-full px-6">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-[40px] font-semibold text-gray-800 mb-2">
            Session History
          </h1>
          <p className="text-gray-600 text-lg">
            Track your productivity over time
          </p>
        </header>

        {/* Filter bar */}
        <div className="flex justify-end mb-6">
          <FilterBar
            tag={selectedTag}
            dateRange={dateRange}
            onTagChange={setSelectedTag}
            onDateRangeChange={setDateRange}
            availableTags={tags}
          />
        </div>

        {/* Sessions list (sin estilos extra) */}
        <SessionsList sessions={filteredSessions} />
      </div>
    </main>
  );
}

export default History;
