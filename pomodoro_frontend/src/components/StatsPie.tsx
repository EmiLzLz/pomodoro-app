import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#8B5CF6", // Purple
  "#FF6B9D", // Pink/Red
  "#06B6D4", // Cyan
  "#F59E0B", // Orange
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F97316", // Deep Orange
];

interface PieChartProps {
  data: { name: string; value: number }[];
  title: string;
}

function StatsPie({ data, title }: PieChartProps) {
  return (
    <>
      <article className="stats-pie-container rounded-2xl p-6 shadow-lg">
        <header className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 text-center m-0">
            {title}
          </h3>
        </header>

        <div className="w-full">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                fill="#8884d8"
                label
                labelLine={true}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
    </>
  );
}

export default StatsPie;
