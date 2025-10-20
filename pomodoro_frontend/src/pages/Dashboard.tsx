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

  const pieData = sessions
    .filter((session) => session.completedAt)
    .reduce((acc, session) => {
      const tagName = session.tag.name;

      const existing = acc.find((item) => item.name === tagName);
      if (existing) existing.value++;
      else acc.push({ name: tagName, value: 1 });
      return acc;
    }, [] as { name: string; value: number }[]);

  const barData = sessions
    .filter((session) => session.completedAt)
    .reduce((acc, session) => {
      const date = session.completedAt!.split("T")[0];
      const existing = acc.find((item) => item.date === date);
      if (existing) existing.count++;
      else acc.push({ date, count: 1 });
      return acc;
    }, [] as { date: string; count: number }[]);

  return (
    <main className="dashboard-container w-full flex justify-center py-12 px-4">
      <div className="dashboard-content w-full max-w-[1100px]">
        {/* Header */}
        <header className="dashboard-header text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl font-normal text-gray-700">
            Your productivity at a glance
          </p>
        </header>

        {/* Stats Cards */}
        <section className="stats-cards-section mb-12">
          <div className="flex flex-wrap justify-center gap-8 lg:justify-between">
            <StatsCard title="Your daily stats" value={todayStats} />
            <StatsCard title="Your weekly stats" value={WeekStats} />
            <StatsCard title="Your Streak" value={streakStats} />
          </div>
        </section>

        {/* Charts */}
        <section className="charts-section grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatsPie data={pieData} title="Tags distributtion" />
          <StatsBar data={barData} title="Completed Pomodoros" />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
