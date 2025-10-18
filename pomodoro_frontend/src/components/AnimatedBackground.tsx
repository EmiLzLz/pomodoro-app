// AnimatedBackground.tsx
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente base */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)",
        }}
      />

      {/* Blobs animados */}
      <div
        className="background-blob background-blob-1 absolute w-96 h-96 rounded-full opacity-30 blur-3xl animate-blob"
        style={{
          background: "radial-gradient(circle, #80DEEA 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          animationDelay: "0s",
        }}
      />

      <div
        className="background-blob background-blob-2 absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-blob"
        style={{
          background: "radial-gradient(circle, #4DD0E1 0%, transparent 70%)",
          top: "60%",
          right: "10%",
          animationDelay: "2s",
        }}
      />

      <div
        className="background-blob background-blob-3 absolute w-80 h-80 rounded-full opacity-25 blur-3xl animate-blob"
        style={{
          background: "radial-gradient(circle, #26C6DA 0%, transparent 70%)",
          bottom: "20%",
          left: "30%",
          animationDelay: "4s",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
