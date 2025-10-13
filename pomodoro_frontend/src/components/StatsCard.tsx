import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

function StatsCard({ icon, title, value }: StatsCardProps) {
  return (
    <div className="card-container">
      <div className="title-icon">
        <div className="icon">{icon}</div>
        <div className="title">
          <h6>{title}</h6>
        </div>
      </div>
      <div className="value-design">
        <h4>{value}</h4>
      </div>
    </div>
  );
}

export default StatsCard;
