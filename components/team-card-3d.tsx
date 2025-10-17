"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Palette, ExternalLink } from "lucide-react";
import "@/styles/team-card-3d.css";

interface TeamCard3DProps {
  name: string;
  role: string;
  description: string;
  image: string;
  link?: string;
  badge?: string;
}

export function TeamCard3D({
  name,
  role,
  description,
  image,
  link,
  badge,
}: TeamCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 30; // max ±15°
    const rotateX = (y / rect.height - 0.5) * -30; // max ±15°

    cardRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    // Bewege das Glare-Highlight
    glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent 60%)`;
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
    <div className="team-card-3d-container">
      <div
        ref={cardRef}
        className="team-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div className="team-card-3d-inner">
          <div className="team-card-3d-bg">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="team-card-3d-avatar">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={50}
              height={50}
            />
            <span>{name}</span>
          </div>

          <div className="team-card-3d-content">
            <div className="team-card-3d-role">{role}</div>
            <div className="team-card-3d-description">{description}</div>

            {link && (
              <div className="team-card-3d-footer">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                  asChild
                >
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <Palette className="h-4 w-4 mr-2" />
                    Artworks ansehen
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            )}

            {badge && !link && (
              <div className="team-card-3d-footer">
                <span className="text-xs uppercase">{badge}</span>
                <span className="text-xs uppercase">mytrueKarma</span>
              </div>
            )}
          </div>

          <div className="team-card-3d-light"></div>
          <div ref={glareRef} className="team-card-3d-glare"></div>
        </div>
      </div>
    </div>
  );
}
