import React from "react";
import type { Session } from "../types/Session";

interface SessionsListProps {
  sessions: Session[];
}

function SessionsList({ sessions }: SessionsListProps) {
  return (
    <div className="sessions-list-wrapper">
      <div className="sessions-list-container">
        <table className="sessions-table">
          <thead className="sessions-table-header">
            <tr>
              <th className="table-header-cell">Date</th>
              <th className="table-header-cell">Tag</th>
              <th className="table-header-cell">Duration</th>
              <th className="table-header-cell">Type</th>
            </tr>
          </thead>
          <tbody className="sessions-table-body">
            {sessions.map((session) => (
              <tr key={session.id} className="table-row">
                <td className="table-cell">{session.completedAt}</td>
                <td className="table-cell">
                  <div className="tag-content">
                    <span
                      className="tag-indicator"
                      style={{ backgroundColor: session.tag.color }}
                    ></span>
                    <span>{session.tag.name}</span>
                  </div>
                </td>
                <td className="table-cell">{session.duration}</td>
                <td className="table-cell">{session.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SessionsList;
