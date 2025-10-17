"use client";
import { useRef } from "react";
import Image from "next/image";

interface InfoCard3DProps {
  children: React.ReactNode;
  className?: string;
}

export function InfoCard3D({ children, className = "" }: InfoCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 15; // max ±7.5°
    const rotateX = (y / rect.height - 0.5) * -15; // max ±7.5°

    cardRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    // Bewege das Glare-Highlight
    glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 60%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;
    cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    glareRef.current.style.opacity = "0";
  };

  const handleMouseEnter = () => {
    if (!glareRef.current) return;
    glareRef.current.style.opacity = "1";
  };

  return (
    <div style={{ perspective: "1200px" }} className={className}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        }}
        className="relative"
      >
        {children}

        {/* Lichtreflex */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            mixBlendMode: "overlay",
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0) 80%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
          className="info-card-3d-light"
        />

        {/* Glare-Effekt */}
        <div
          ref={glareRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 40%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <style jsx>{`
        div:hover .info-card-3d-light {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
