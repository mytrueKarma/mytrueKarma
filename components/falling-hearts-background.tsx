"use client";

import React from "react";

export default function FallingHeartsBackground() {
  // FinisherHeader style: 100 hearts, random positions, sizes, colors
  const heartColors = ["#fbfcca", "#d7f3fe", "#ffd0a7"];
  const hearts = Array.from({ length: 100 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = `${Math.random() * 8}s`;
    const size = Math.floor(Math.random() * 7) + 2; // 2-8px
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
    const skew = -2;
    return { left, delay, size, color, skew };
  });

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ background: "#201e30", mixBlendMode: "overlay" }}
    >
      <style>{`
        .heart-fall {
          position: absolute;
          animation: fallDown 8s infinite linear;
          user-select: none;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.2));
        }
        @keyframes fallDown {
          0% {
            top: -10%;
            opacity: 0;
            transform: rotate(0deg) scale(0.5) skew(-2deg);
          }
          10% {
            opacity: 1;
            transform: rotate(0deg) scale(1) skew(-2deg);
          }
          90% {
            opacity: 1;
            transform: rotate(180deg) scale(1) skew(-2deg);
          }
          100% {
            top: 110%;
            opacity: 0;
            transform: rotate(360deg) scale(0.5) skew(-2deg);
          }
        }
      `}</style>

      {hearts.map((heart, index) => (
        <div
          key={index}
          className="heart-fall"
          style={{
            left: `${heart.left}%`,
            color: heart.color,
            fontSize: `${heart.size * 3}px`,
            textShadow: `0 0 10px ${heart.color}, 0 0 20px ${heart.color}`,
            animation: `fallDown 8s infinite linear ${heart.delay}`,
            opacity: 1,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}
