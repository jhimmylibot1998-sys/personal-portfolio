import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number; // strength of magnetic pull (0.1 to 0.5)
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.28,
  className = '',
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
    setIsHovered(true);
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none will-change-transform ${className}`}
      {...props}
    >
      {/* Subtle inner content slight parallax offset */}
      <span
        className="inline-flex items-center gap-1.5 w-full h-full justify-center pointer-events-none transition-transform duration-150"
        style={{
          transform: `translate3d(${position.x * 0.2}px, ${position.y * 0.2}px, 0)`,
        }}
      >
        {children}
      </span>
    </button>
  );
}
