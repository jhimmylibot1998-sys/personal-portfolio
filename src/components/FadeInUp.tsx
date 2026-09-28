import React from 'react';
import { motion } from 'framer-motion';
import { useFadeInObserver, FadeInObserverOptions } from '../hooks/useFadeInObserver';

interface FadeInUpProps extends FadeInObserverOptions {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  onClick?: () => void;
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.55,
  distance = 24,
  className = '',
  onClick,
  ...observerOptions
}: FadeInUpProps) {
  const { ref, isInView } = useFadeInObserver(observerOptions);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
