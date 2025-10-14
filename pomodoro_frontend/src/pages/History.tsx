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
    //filter by tag
    if (selectedTag && session.tag !== selectedTag) return false;

    //filter by date range
    const sessionDate = new Date(session.completedAt);
    if (dateRange.startDate && sessionDate < dateRange.startDate) return false;
    if (dateRange.endDate && sessionDate > dateRange.endDate) return false;

    return true;
  });

  return (
    <div>
      <h1>Your History</h1>
      <div className="container">
        <FilterBar
          tag={selectedTag}
          dateRange={dateRange}
          onTagChange={setSelectedTag}
          onDateRangeChange={setDateRange}
          availableTags={tags}
        />
        <SessionsList sessions={filteredSessions} />
      </div>
    </div>
  );
}

export default History;
