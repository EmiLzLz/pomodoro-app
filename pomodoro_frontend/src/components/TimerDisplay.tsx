// TimerDisplay.tsx
import React from 'react';
import Icon from '@mdi/react';
import { mdiPlay, mdiPause, mdiRestart } from '@mdi/js';

interface TimerDisplayProps {
  formatted: string;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  progress?: number; // Porcentaje de progreso 0-100
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  formatted,
  isRunning,
  onStart,
  onPause,
  onReset,
  progress = 0,
}) => {
  // Calcular el strokeDashoffset para la animación circular (más pequeño para ir por dentro)
  const radius = 190;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <section className="timer-container flex flex-col items-center justify-center gap-8 py-8">
      {/* Timer Circle */}
      <div className="timer-circle-wrapper relative w-[420px] h-[420px]">
        {/* Glass Effect Circle - Base */}
        <div className="timer-glass-circle absolute inset-0 m-auto w-[420px] h-[420px] rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
          
          {/* SVG Progress Ring - INSIDE */}
          <svg
            className="timer-progress-ring absolute top-0 left-0 w-full h-full -rotate-90"
            width="420"
            height="420"
          >

            {/* Progress Circle with Gradient */}
            <defs>
              <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00BCD4" stopOpacity="1" />
                <stop offset="30%" stopColor="#33C9DD" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#54D2E2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8AE0EB" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <circle
              className="timer-progress-stroke transition-all duration-1000 ease-linear"
              cx="210"
              cy="210"
              r={radius}
              fill="transparent"
              stroke="url(#timer-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          {/* Timer Display */}
          <time className="timer-display text-[#004F59] font-bold text-7xl tracking-tight z-10" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {formatted}
          </time>
        </div>
      </div>

      {/* Timer Actions */}
      <nav className="timer-actions flex items-center justify-center gap-6" aria-label="Timer controls">
        {isRunning ? (
          <button
            onClick={onPause}
            className="timer-button timer-button-pause w-[70px] h-[70px] rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            aria-label="Pause timer"
            type="button"
          >
            <Icon path={mdiPause} size={1.2} className="text-white" />
          </button>
        ) : (
          <button
            onClick={onStart}
            className="timer-button timer-button-start w-[70px] h-[70px] rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            aria-label="Start timer"
            type="button"
          >
            <Icon path={mdiPlay} size={1.2} className="text-white" />
          </button>
        )}
        
        <button
          onClick={onReset}
          className="timer-button timer-button-reset w-[70px] h-[70px] rounded-full bg-[#4F46E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
          aria-label="Reset timer"
          type="button"
        >
          <Icon path={mdiRestart} size={1.2} className="text-white" />
        </button>
      </nav>
    </section>
  );
};

export default TimerDisplay;