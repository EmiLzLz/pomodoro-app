import { useEffect, useState } from "react";

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "short-break" | "long-break">(
    "work"
  );
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const handleModeChange = (): void => {
    if (mode === "work") {
      setSessionCompleted(true); // Marcar sesión completada
      setPomodoroCount((prev) => prev + 1);

      if (pomodoroCount + 1 === 4) {
        setMode("long-break");
        setTimeLeft(15 * 60);
        setPomodoroCount(0);
      } else {
        setMode("short-break");
        setTimeLeft(5 * 60);
      }
    } else {
      setMode("work");
      setTimeLeft(25 * 60);
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleModeChange();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return {
    timeLeft,
    mode,
    pomodoroCount,
    isRunning,
    sessionCompleted,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => {
      setTimeLeft(25 * 60);
      setIsRunning(false);
      setMode("work");
      setSessionCompleted(false);
    },
    clearSessionCompleted: () => setSessionCompleted(false), // Reset after saving
  };
}
