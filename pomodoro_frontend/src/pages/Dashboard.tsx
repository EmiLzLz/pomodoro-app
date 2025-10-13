import React, { useEffect, useState } from "react";
import StatsBar from "../components/StatsBar";
import StatsPie from "../components/StatsPie";
import StatsCard from "../components/StatsCard";
import {
  getStreakStats,
  getTodayStats,
  getWeekStats,
} from "../services/statsService";
import { getSessions } from "../services/sessionService";
import { Apple, Search, Sun } from "lucide-react";
import type { Session } from "../types/Session";

function Dashboard() {
  const [todayStats, setTodayStats] = useState(0);
  const [WeekStats, setWeekStats] = useState(0);
  const [streakStats, setStreakStats] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    getTodayStats().then((data) => setTodayStats(data.today));
    getWeekStats().then((data) => setWeekStats(data.week));
    getStreakStats().then((data) => setStreakStats(data.streak));
    getSessions().then(setSessions);
  }, []);

  const pieData = sessions.reduce((acc, session) => {
    const existing = acc.find((item) => item.name === session.tag);
    if (existing) existing.value++;
    else acc.push({ name: session.tag, value: 1 });
    return acc;
  }, [] as { name: string; value: number }[]);

  const barData = sessions.reduce((acc, session) => {
    const date = session.completedAt.split('T')[0]; 
    const existing = acc.find((item) => item.date === date);
    if (existing) existing.count++;
    else acc.push({ date, count: 1 });
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <div className="dashboard-container">
      <div className="cards-pie">
        <div className="col col-1">
          <StatsCard
            icon={<Sun />}
            title="Your daily stats"
            value={todayStats}
          />
          <StatsCard
            icon={<Apple />}
            title="Your weekly stats"
            value={WeekStats}
          />
        </div>
        <div className="col col-2">
          <StatsCard
            icon={<Search />}
            title="Your Streak"
            value={streakStats}
          />
          <StatsPie data={pieData} title="Tags distributtion" />
        </div>
      </div>
      <div className="chart">
        <StatsBar data={barData} title="Completed Pomodoros" />
      </div>
    </div>
  );
}

export default Dashboard;
