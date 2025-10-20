import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
}

function StatsCard({ title, value }: StatsCardProps) {
  // Determinar el subtítulo según el título
  const getSubtitle = () => {
    if (
      title.toLowerCase().includes("daily") ||
      title.toLowerCase().includes("today")
    ) {
      return "Sessions Completed";
    }
    if (
      title.toLowerCase().includes("weekly") ||
      title.toLowerCase().includes("week")
    ) {
      return "Sessions completed";
    }
    if (title.toLowerCase().includes("streak")) {
      return "Days in a row";
    }
    return "Sessions completed";
  };

  return (
    <>
      <article className="flex flex-col items-center gap-4 p-6">
        <figure className="relative flex items-center justify-center m-0">
          {/* Anillos de pulso */}
          <div
            className="absolute w-24 h-24 rounded-full stats-pulse-ring"
            style={{
              background:
                "radial-gradient(circle, #008597 0%, #00BCD4 50%, #33C9DD 100%)",
            }}
          ></div>
          <div
            className="absolute w-24 h-24 rounded-full stats-pulse-ring-delayed"
            style={{
              background:
                "radial-gradient(circle, #008597 0%, #00BCD4 50%, #33C9DD 100%)",
            }}
          ></div>

          {/* Círculo principal */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center z-10"
            style={{
              backgroundColor: "#008597",
              boxShadow:
                "0 0 30px rgba(0, 133, 151, 0.8), 0 0 50px rgba(0, 188, 212, 0.5), 0 0 70px rgba(51, 201, 221, 0.3)",
            }}
          >
            <span
              className="text-4xl font-bold"
              style={{
                color: "#B0EAF2",
                textShadow:
                  "0 0 10px rgba(176, 234, 242, 0.6), 0 0 20px rgba(176, 234, 242, 0.4)",
              }}
            >
              {value}
            </span>
          </div>
        </figure>

        <header className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-800 m-0">{title}</h3>
          <p className="text-lg font-normal text-gray-600 m-0">
            {getSubtitle()}
          </p>
        </header>
      </article>
    </>
  );
}

export default StatsCard;
