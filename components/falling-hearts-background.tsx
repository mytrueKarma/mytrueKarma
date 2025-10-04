"use client";

import React from "react";

export default function FallingHeartsBackground() {
  const hearts = [
    { color: "#FF4500", delay: "0s" },
    { color: "#32CD32", delay: "0.8s" },
    { color: "#1E90FF", delay: "1.6s" },
    { color: "#FFD700", delay: "2.4s" },
    { color: "#8A2BE2", delay: "3.2s" },
    { color: "#20B2AA", delay: "4s" },
    { color: "#DC143C", delay: "4.8s" },
    { color: "#00FA9A", delay: "5.6s" },
    { color: "#FF1493", delay: "6.4s" },
    { color: "#00BFFF", delay: "7.2s" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        .heart-fall {
          position: absolute;
          animation: fallDown 8s infinite linear;
          font-size: 24px;
          user-select: none;
        }
        
        @keyframes fallDown {
          0% {
            top: -10%;
            opacity: 0;
            transform: rotate(0deg) scale(0.5);
          }
          10% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
          90% {
            opacity: 1;
            transform: rotate(180deg) scale(1);
          }
          100% {
            top: 110%;
            opacity: 0;
            transform: rotate(360deg) scale(0.5);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
      `}</style>

      {hearts.map((heart, index) => (
        <div
          key={index}
          className="heart-fall"
          style={{
            left: `${10 + index * 8}%`,
            color: heart.color,
            textShadow: `0 0 10px ${heart.color}, 0 0 20px ${heart.color}`,
            animation: `fallDown 8s infinite linear ${
              heart.delay
            }, pulse 2s infinite ease-in-out ${index * 0.3}s`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}
