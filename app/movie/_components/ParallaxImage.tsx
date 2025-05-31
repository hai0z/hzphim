"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
  children?: React.ReactNode;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = "",
  intensity = 0.5,
  children,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Only enable parallax on desktop to avoid performance issues on mobile
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (mediaQuery.matches) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", handleScroll);
        setScrollY(0); // Reset on mobile
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const parallaxOffset = scrollY * intensity;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          scale: "1.1",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          quality={75}
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-base-100 h-24" />

      {/* Dot Pattern Overlay */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgb(0, 0, 0) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          opacity: 0.3,
        }}
      />

      {/* Mask for smooth edges */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(0deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      />

      {/* Content */}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
};

export default ParallaxImage;
