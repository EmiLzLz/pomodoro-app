// Timer.tsx
import React, { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { createSession } from "../services/sessionService";
import { getTags } from "../services/tagService";
import type { Tag } from "../types/Tag";
import TimerDisplay from "../components/TimerDisplay";
import TagSelector from "../components/TagSelector";

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

  // Calcular el progreso basado en el modo
  const getTotalTime = () => {
    switch (mode) {
      case "work":
        return 25 * 60; // 25 minutos en segundos
      case "short-break":
        return 5 * 60; // 5 minutos en segundos
      case "long-break":
        return 15 * 60; // 15 minutos en segundos
      default:
        return 25 * 60;
    }
  };

  const totalTime = getTotalTime();
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (sessionCompleted) {
      const saveSession = async () => {
        await createSession({
          duration: 25,
          tag: selectedTag,
          completedAt: new Date().toISOString(),
          type: mode,
          pomodoroCount,
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
      <h1>Timer</h1>

      <TimerDisplay
        formatted={formatted}
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
        progress={progress}
      />

      <TagSelector
        tags={tags}
        selectedTag={selectedTag}
        onChange={setSelectedTag}
      />

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
