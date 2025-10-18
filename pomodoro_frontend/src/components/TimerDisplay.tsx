// TimerDisplay.tsx
import React from "react";
import Icon from "@mdi/react";
import { mdiPlay, mdiPause, mdiRestart } from "@mdi/js";

interface TimerDisplayProps {
  formatted: string;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  progress?: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  formatted,
  isRunning,
  onStart,
  onPause,
  onReset,
  progress = 0,
}) => {
  const radius = 190;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <section className="timer-container flex flex-col items-center justify-center gap-6 sm:gap-8 py-4 sm:py-8 w-full">
      {/* Timer Circle */}
      <div className="timer-circle-wrapper relative w-full max-w-[420px] aspect-square">
        {/* Glass Effect Circle - Base */}
        <div className="timer-glass-circle absolute inset-0 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
          {/* SVG Progress Ring - INSIDE */}
          <svg
            className="timer-progress-ring absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 420 420"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Gradient */}
            <defs>
              <linearGradient
                id="timer-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#33C9DD" stopOpacity="1" />
                <stop offset="60%" stopColor="#54D2E2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8AE0EB" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Progress */}
            <circle
              className="timer-progress-stroke transition-all duration-1000 ease-linear"
              cx="210"
              cy="210"
              r={radius}
              fill="transparent"
              stroke="url(#timer-gradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                filter: "drop-shadow(0 0 8px rgba(0, 188, 212, 0.6))",
              }}
            />
          </svg>

          {/* Timer Display */}
          <time
            className="timer-display text-[#004F59] font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight z-10"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {formatted}
          </time>
        </div>
      </div>

      {/* Timer Actions */}
      <nav
        className="timer-actions flex items-center justify-center gap-4 sm:gap-6"
        aria-label="Timer controls"
      >
        {isRunning ? (
          <button
            onClick={onPause}
            className="timer-button timer-button-pause w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            aria-label="Pause timer"
            type="button"
          >
            <Icon path={mdiPause} size={1} className="text-white" />
          </button>
        ) : (
          <button
            onClick={onStart}
            className="timer-button timer-button-start w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            aria-label="Start timer"
            type="button"
          >
            <Icon path={mdiPlay} size={1} className="text-white" />
          </button>
        )}

        <button
          onClick={onReset}
          className="timer-button timer-button-reset w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
          aria-label="Reset timer"
          type="button"
        >
          <Icon path={mdiRestart} size={1} className="text-white" />
        </button>
      </nav>
    </section>
  );
};

export default TimerDisplay;
