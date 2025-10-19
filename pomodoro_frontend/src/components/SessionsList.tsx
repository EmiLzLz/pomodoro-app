import React from "react";
import type { Session } from "../types/Session";

interface SessionsListProps {
  sessions: Session[];
}

function SessionsList({ sessions }: SessionsListProps) {
  return (
    <div className="table-container">
      {sessions.map((session) => (
        <tr key={session.id}>
          <td>
            <span
              className="tag-indicator"
              style={{ backgroundColor: session.tag.color }}
            />
            {session.tag.name}
          </td>
          <td>{session.duration}</td>
          <td>{session.completedAt}</td>
        </tr>
      ))}
    </div>
  );
}

export default SessionsList;
