import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatsBarProps {
  data: { date: string; count: number }[];
  title: string;
}

function StatsBar({ data, title }: StatsBarProps) {
  // Formatear fecha para mejor legibilidad
  const formattedData = data.map((item) => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <>
      <section className="stats-bar-container rounded-2xl p-6 shadow-lg">
        <header className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 m-0">{title}</h3>
        </header>

        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0, 0, 0, 0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="displayDate"
                tick={{ fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(0, 0, 0, 0.1)" }}
              />
              <YAxis
                tick={{ fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(0, 0, 0, 0.1)" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}

export default StatsBar;
