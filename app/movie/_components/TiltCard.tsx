"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
  glareColor?: string;
  glareOpacity?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltMaxAngle = 15,
  scale = 1.05,
  perspective = 1000,
  glare = true,
  glareColor = 'rgba(255, 255, 255, 0.1)',
  glareOpacity = 0.3
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * tiltMaxAngle;
    const rotateYValue = (mouseX / (rect.width / 2)) * tiltMaxAngle;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
    
    // Calculate glare position
    const glareXValue = ((e.clientX - rect.left) / rect.width) * 100;
    const glareYValue = ((e.clientY - rect.top) / rect.height) * 100;
    setGlareX(glareXValue);
    setGlareY(glareYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu transition-all duration-300 ease-out ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor} 0%, transparent 50%)`,
            opacity: glareOpacity,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      
      {/* Subtle shadow */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl bg-black/20 blur-xl transition-all duration-300"
        style={{
          transform: `translateY(${isHovered ? 10 : 5}px) scale(${isHovered ? 1.05 : 1})`,
          opacity: isHovered ? 0.3 : 0.1,
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
