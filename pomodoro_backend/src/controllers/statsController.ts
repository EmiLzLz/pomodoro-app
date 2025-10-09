import type { Request, Response } from "express";
import { readSessions } from "../utils/sessionHandler.js";

// Calculate history for todayt, week and streak

//Helper to check if two dates are on the same day
function isSameDay(d1: Date, d2: Date): Boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isYesterday(date: Date, today: Date): Boolean {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return isSameDay(date, yesterday);
}

export const getTodayPomodoros = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();
    const now = new Date();

    const completedPomodoro = sessions
      .filter((session) => session.type === "work" && session.completedAt)
      .map((session) => new Date(session.completedAt));

    // Count for today
    const todayCount = completedPomodoro.filter((date) =>
      isSameDay(date, now)
    ).length;

    res.status(200).json({ today: todayCount });
  } catch (error) {
    console.log("Stats for today are not able", error);
    res.status(500).send();
  }
};

export const getWeekPomodoros = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();
    const now = new Date();

    const completedPomodoro = sessions
      .filter((session) => session.type === "work" && session.completedAt)
      .map((session) => new Date(session.completedAt));

    //Count for the week
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const weekCount = completedPomodoro.filter(
      (date) => date >= startOfWeek
    ).length;

    res.status(200).json({ week: weekCount });
  } catch (error) {
    console.log("Week stats are not able", error);
    res.status(500).send();
  }
};

export const getStreak = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();
    const now = new Date();

    const completedPomodoro = sessions
      .filter((session) => session.type === "work" && session.completedAt)
      .map((session) => new Date(session.completedAt));

    //Count for the streak
    let streak = 1;

    //Order sessions in reverse chronological order
    const uniqueDates = [
      ...new Set(completedPomodoro.map((d) => d.toDateString())),
    ]
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => b.getTime() - a.getTime());

    if (!isSameDay(uniqueDates[0], now) && !isYesterday(uniqueDates[0], now)) {
      return res.status(200).json({ streak: 0 });
    }

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      if (
        (uniqueDates[i].getTime() - uniqueDates[i + 1].getTime()) /
          (1000 * 60 * 60 * 24) ===
        1
      ) {
        streak++;
      } else {
        break;
      }
    }

    return res.status(200).json(streak);
  } catch (error) {
    console.log("Streak is not able", error);
    res.status(500).send();
  }
};
