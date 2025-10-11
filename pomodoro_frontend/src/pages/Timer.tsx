import React, { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { createSession } from "../services/sessionService";
import { getTags } from "../services/tagService";
import type { Tag } from "../types/Tag";
function Timer() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const {
    start,
    pause,
    reset,
    sessionCompleted,
    timeLeft,
    mode,
    isRunning,
    clearSessionCompleted,
    pomodoroCount,
  } = useTimer();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    if (sessionCompleted) {
      const saveSession = async () => {
        await createSession({
          duration: 25,
          tag: selectedTag,
          completedAt: new Date().toISOString(),
          type: mode,
          pomodoroCount: pomodoroCount,
        });
        clearSessionCompleted();
      };
      saveSession();
    }
  }, [sessionCompleted]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <div className="timer-container">
      Timer
      <div className="circle-container">
        <div className="circle-countdown">
          <h2 className="countdown text-blue-500 font-bold">{formatted}</h2>
        </div>
        <div className="timer-actions">
          {isRunning ? (
            <button
              onClick={() => {
                pause();
              }}
              className="button pause"
            >
              PAUSE
            </button>
          ) : (
            <button
              onClick={() => {
                start();
              }}
              className="button start"
            >
              START
            </button>
          )}
          <button
            onClick={() => {
              reset();
            }}
            className="button reset"
          >
            RESET
          </button>
        </div>
      </div>
      <div className="tag-selector">
        <label htmlFor="tag-select">Etiquetas disponibles:</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option
              key={tag.id}
              value={tag.id}
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pomodoro-count">
        <h6>Pomodoro {pomodoroCount} of 4</h6>
      </div>
      <div className="mode-info">
        <p>{mode}</p>
      </div>
    </div>
  );
}

export default Timer;
