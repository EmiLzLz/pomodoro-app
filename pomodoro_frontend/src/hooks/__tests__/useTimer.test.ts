import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTimer } from "../useTimer";

describe("useTimer hook", () => {
  // beforeEach run before each test inside describe.
  // Initialize mocks or timers
  beforeEach(() => {
    vi.useFakeTimers(); // Simulate timers
  });

  // Run after each test
  // Cleans, reset mocks and restore states/timers
  afterEach(() => {
    vi.useRealTimers(); // Restore real timers
  });

  test("Should initialize with correct default state", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.timeLeft).toBe(25 * 60);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.mode).toBe("work");
    expect(result.current.pomodoroCount).toBe(0);
    expect(result.current.sessionCompleted).toBe(false);
  });

  test("Start should set isRunning to true", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);
  });

  test("Pause should set isRunning to false", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
  });
});


