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

  const getTotalTime = () => {
    switch (mode) {
      case "work":
        return 25 * 60;
      case "short-break":
        return 5 * 60;
      case "long-break":
        return 15 * 60;
      default:
        return 25 * 60;
    }
  };

  const totalTime = getTotalTime();
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const getModeDisplay = () => {
    switch (mode) {
      case "work":
        return "WORK";
      case "short-break":
        return "SHORT BREAK";
      case "long-break":
        return "LONG BREAK";
      default:
        return "WORK";
    }
  };

  useEffect(() => {
    if (sessionCompleted) {
      const saveSession = async () => {
        const selectedTagObj = tags.find((t) => t.id === selectedTag);

        if (!selectedTagObj) {
          console.error("No tag selected");
          clearSessionCompleted();
          return;
        }

        await createSession({
          duration: 25,
          tag: selectedTagObj, // ← Objeto completo en lugar de string
          completedAt: new Date().toISOString(),
          type: mode,
          pomodoroCount,
        });
        clearSessionCompleted();
      };
      saveSession();
    }
  }, [
    sessionCompleted,
    selectedTag,
    tags, // ← Agregar tags a dependencias
    mode,
    pomodoroCount,
    clearSessionCompleted,
  ]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <main className="timer-page w-full h-full flex items-center justify-center px-4 py-8">
      <div className="timer-content-wrapper w-full max-w-2xl flex flex-col items-center gap-6">
        {/* Pomodoro Count */}
        <h1
          className="pomodoro-count-title text-gray-800 font-semibold text-3xl"
        >
          Pomodoro {pomodoroCount} of 4
        </h1>

        {/* Timer Display */}
        <TimerDisplay
          formatted={formatted}
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
          progress={progress}
        />

        {/* Tag Selector */}
        <TagSelector
          tags={tags}
          selectedTag={selectedTag}
          onChange={setSelectedTag}
        />

        {/* Mode Badge */}
        <div className="mode-badge inline-flex items-center gap-2 px-5 py-2 bg-white/60 backdrop-blur-sm border border-[#004F59]/20 rounded-full shadow-sm">
          <span className="mode-indicator w-2 h-2 rounded-full bg-[#004F59] animate-pulse" />
          <p
            className="mode-text text-[#004F59] font-semibold text-sm tracking-wide uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {getModeDisplay()}
          </p>
        </div>
      </div>
    </main>
  );
}

export default Timer;
